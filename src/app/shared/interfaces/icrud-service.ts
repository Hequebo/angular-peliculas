import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginationDTO } from "../models/paginationDTO";

export interface ICRUDService<TDTO, TCreationDTO> {
    getPaginated(pagination: PaginationDTO): Observable<HttpResponse<TDTO[]>>;
    getById(id: number): Observable<TDTO>;
    create(entity: TCreationDTO): Observable<any>;
    update(id: number, entity: TCreationDTO): Observable<any>
    delete(id: number): Observable<any>
}
