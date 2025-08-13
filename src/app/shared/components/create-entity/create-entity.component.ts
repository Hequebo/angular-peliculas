import { AfterViewInit, Component, ComponentRef, inject, Input, numberAttribute, ViewChild, ViewContainerRef } from '@angular/core';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { ICRUDService } from '../../interfaces/icrud-service';
import { Router } from '@angular/router';
import { getErrors } from '../../functions/get-errors';
import { ShowErrorsComponent } from "../show-errors/show-errors.component";
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-create-entity',
  imports: [ShowErrorsComponent],
  templateUrl: './create-entity.component.html',
  styleUrl: './create-entity.component.css'
})
export class CreateEntityComponent<TDTO, TCreationDTO> implements AfterViewInit {
  ngAfterViewInit(): void {
    this.#componentRef = this.formContainer.createComponent(this.form);
    this.#componentRef.instance.formPost.subscribe((entity: any) => {
      this.saveChanges(entity);
    });
  }
  
  @Input({ required : true })
  title!: string;

  @Input({ required: true })
  indexPath!: string;

  @Input({ required: true })
  form: any;

  errors: string[] = [];

  #CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  #router = inject(Router);

  @ViewChild('formContainer', { read: ViewContainerRef})
  formContainer!: ViewContainerRef;

  #componentRef!: ComponentRef<any>

  saveChanges(entity: TCreationDTO) {
    this.#CRUDService.create(entity).subscribe({
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
