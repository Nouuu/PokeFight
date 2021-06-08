import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {LikeButtonComponent} from './features/like-button/like-button.component';
import {LogComponent} from './features/log/log.component';
import {PokemonComponent} from './features/pokemon/pokemon.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let view: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LikeButtonComponent, LogComponent, PokemonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    view = fixture.elementRef.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PokeFight'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PokeFight');
  });
});
