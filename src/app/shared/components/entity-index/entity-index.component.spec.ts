import { TestBed } from "@angular/core/testing"
import { EntityIndexComponent } from "./entity-index.component"
import { ICRUDService } from "../../interfaces/icrud-service";
import { of } from "rxjs";
import { CRUD_SERVICE_TOKEN } from "../../providers/providers";
import { RouterModule } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('EntityIndexComponent', () => {
    let mockICRUDService: jasmine.SpyObj<ICRUDService<object, object>>;

    beforeEach(async () => {
        mockICRUDService = jasmine.createSpyObj<ICRUDService<object, object>>('ICRUDService', 
            ['getPaginated', 'delete']);

        mockICRUDService.getPaginated.and.returnValue(of());
        mockICRUDService.delete.and.returnValue(of({}));

        await TestBed.configureTestingModule({
            imports: [
                EntityIndexComponent,
                RouterModule.forRoot([]),
                SweetAlert2Module.forRoot()
            ],
            providers: [
                {
                    provide: CRUD_SERVICE_TOKEN, 
                    useValue: mockICRUDService
                },
                provideAnimationsAsync()
            ]
        }).compileComponents();
    });

    it('Should correctly create the component', () => {
        const fixture = TestBed.createComponent(EntityIndexComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('Shoul place the page equal to 1 when delete is called', () => {
        const fixture = TestBed.createComponent(EntityIndexComponent);
        const component = fixture.componentInstance;

        const id = 1;
        component.pagination.page = 2;

        component.delete(id);
        
        expect(component.pagination.page).toBe(1);
    });

    it('Should show a table when records exist when loadRecords is called', () => {
        const fixture = TestBed.createComponent(EntityIndexComponent);
        const component = fixture.componentInstance;
        const response = new HttpResponse<object[]>({ body: [{}] });

        mockICRUDService.getPaginated.and.returnValue(of(response));

        component.loadRecords();

        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('table').length).toBe(1);
    })

    it('Should NOT show a table when records does NOT exist when loadRecors is called', () => {
        const fixture = TestBed.createComponent(EntityIndexComponent);
        const component  = fixture.componentInstance;
        const response = new HttpResponse<object[]>({ body: []});

        mockICRUDService.getPaginated.and.returnValue(of(response));

        component.loadRecords();

        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('table').length).toBe(0);
    });
});
