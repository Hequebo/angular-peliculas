import { AfterViewInit, Component, ComponentRef, inject, Input, numberAttribute, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { getErrors } from '../../functions/get-errors';
import { ICRUDService } from '../../interfaces/icrud-service';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-edit-entity',
  imports: [ShowErrorsComponent, LoadingComponent],
  templateUrl: './edit-entity.component.html',
  styleUrl: './edit-entity.component.css'
})
export class EditEntityComponent<TDTO,TCreationDTO> implements OnInit {
  ngOnInit(): void {
    this.#CRUDService.getById(this.id).subscribe((entity) => {
        console.log('Desde la base de datos:', entity);
        this.loadComponent(entity);
    });
  }

  loadComponent(entity: any) {
    if (this.formContainer) {
      this.#componentRef = this.formContainer.createComponent(this.form);
      this.#componentRef.instance.model = entity;
      this.#componentRef.instance.formPost.subscribe((entity: any) => {
        this.saveChanges(entity);
      });
      this.loading = false;
    }
  }
  
  @Input({ transform: numberAttribute})
  id!: number;

  @Input({ required : true })
  title!: string;

  @Input({ required: true })
  indexPath!: string;

  @Input({ required: true })
  form: any;

  errors: string[] = [];

  #CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  #router = inject(Router);
  loading = true;

  @ViewChild('formContainer', { read: ViewContainerRef})
  formContainer!: ViewContainerRef;

  #componentRef!: ComponentRef<any>

  saveChanges(entity: TCreationDTO) {
    this.#CRUDService.update(this.id ,entity).subscribe({
      next: () => {
        this.#router.navigate([this.indexPath]);
      },
      error: err => {
        const errors = getErrors(err);
        this.errors = errors;
      }
    });
  }
}
