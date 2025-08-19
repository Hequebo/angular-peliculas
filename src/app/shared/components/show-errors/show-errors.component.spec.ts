import { TestBed } from "@angular/core/testing";
import { ShowErrorsComponent } from "./show-errors.component";

describe('ShowErrorsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShowErrorsComponent]
        }).compileComponents();
    });

    it('Should correctly create the component', () => {
        const fixture = TestBed.createComponent(ShowErrorsComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('Should show a list-itme when there is an error', () => {
        const fixture = TestBed.createComponent(ShowErrorsComponent);
        const component = fixture.componentInstance;
        
        component.errors = ['Error'];
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('li').length).toBe(1);
    });
});