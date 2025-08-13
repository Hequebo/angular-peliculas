import { Component, inject } from '@angular/core';
import { PaginationDTO } from '../../shared/models/paginationDTO';
import { UserDTO } from '../security';
import { SecurityService } from '../security.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-index',
  imports: [
    MatTableModule,
    MatButtonModule,
    GenericListComponent,
    MatPaginatorModule,
    SweetAlert2Module
  ],
  templateUrl: './users-index.component.html',
  styleUrl: './users-index.component.css'
})
export class UsersIndexComponent {
  #securityService = inject(SecurityService);

  columnsToShow = ['email', 'acciones'];
  pagination: PaginationDTO = {
    page: 1,
    recordsPerPage: 10
  };
  totalRecordsAmount!: number;
  users!: UserDTO[];

  constructor() {
    this.loadRecords();
  }

  loadRecords() { 
    this.#securityService.getUsersPaginated(this.pagination).subscribe(response => {
      this.users = response.body as UserDTO[];
      const headers = response.headers.get('cantidad-total-registros') as string;
      this.totalRecordsAmount = parseInt(headers, 10);
    });
  }

  updatePagination(data: PageEvent) {
    this.pagination = {
      page: data.pageIndex + 1,
      recordsPerPage : data.pageSize
    };
    this.loadRecords();
  }

  asignAdmin(email: string) {
    this.#securityService.asingAdmin(email)
    .subscribe(() => {
      Swal.fire('Exitoso', `El usuario ${email} ahora es admin`, 'success');
    });
  }

  removeAdmin(email: string) {
    this.#securityService.removeAdmin(email)
    .subscribe(() => {
      Swal.fire('Exitoso', `El usuario ${email} ya no es admin`, 'success');
    });
  }
}
