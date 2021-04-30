import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {LikeButtonComponent} from "./features/like-button/like-button.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let view: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LikeButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    view = fixture.elementRef.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PokeFight'`, () => {
    /*
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
    */
    expect(component.title).toEqual('PokeFight');
  });
});
