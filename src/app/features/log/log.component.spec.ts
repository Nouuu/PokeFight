import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogComponent} from './log.component';
import {LogService} from '../../utils/log.service';
import {LogDirective} from './log.directive';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogComponent, LogDirective],
      providers: [LogService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
