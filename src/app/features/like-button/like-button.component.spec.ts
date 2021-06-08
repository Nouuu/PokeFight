import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LikeButtonComponent} from './like-button.component';

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  let view: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    view = fixture.elementRef.nativeElement;
    fixture.detectChanges();
  });

  it('should display 0 likes by default', () => {
    expect(view.innerHTML).toContain('0 like');
  });

  it('should display 10 likes after default', () => {
    component.nbLikes = 10;
    fixture.detectChanges();
    expect(view.innerHTML).toContain('10 likes');
  });
});
