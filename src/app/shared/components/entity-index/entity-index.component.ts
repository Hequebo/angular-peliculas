import { Component, inject, Input } from '@angular/core';
import { PaginationDTO } from '../../models/paginationDTO';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { GenericListComponent } from "../../generic-list/generic-list.component";
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { translateToSpanish } from '../../functions/translate-to-spanish';
import { ICRUDService } from '../../interfaces/icrud-service';

@Component({
  selector: 'app-entity-index',
  imports: [
    GenericListComponent,
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    SweetAlert2Module,
    TitleCasePipe
  ],
  templateUrl: './entity-index.component.html',
  styleUrl: './entity-index.component.css'
})
export class EntityIndexComponent<TDTO, TCreationDTO> {
  @Input({ required: true })
  title!: string;

  @Input({ required: true})
  createPath!: string;

  @Input({ required: true })
  editPath!: string;

  @Input()
  columnsToShow = ['id', 'name', 'acciones'];

  #CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;

  pagination: PaginationDTO = {
    page: 1,
    recordsPerPage: 5 
  };
  entities!: TDTO[];
  totalRecordsAmount!: number;
  
  constructor() {
    this.loadRecords();
  }

  loadRecords() {
    this.#CRUDService.getPaginated(this.pagination).subscribe((response: HttpResponse<TDTO[]>) => {
      this.entities = response.body as TDTO[];
      console.log(this.entities);
      const header = response.headers.get('cantidad-total-registros') as string;
      this.totalRecordsAmount = parseInt(header, 10);
    });
  }

  updatePagination(data: PageEvent) {
    this.pagination = {
       page: data.pageIndex + 1,
       recordsPerPage: data.pageSize
    };
    this.loadRecords();
  }

  delete(id: number) {
    this.#CRUDService.delete(id).subscribe(() => {
      this.pagination.page = 1;
      this.loadRecords();
    });
  }

  translate(title: string): string {
    return translateToSpanish(title);
  }
}
