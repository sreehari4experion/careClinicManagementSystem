import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmedicinebillComponent } from './viewmedicinebill.component';

describe('ViewmedicinebillComponent', () => {
  let component: ViewmedicinebillComponent;
  let fixture: ComponentFixture<ViewmedicinebillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewmedicinebillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmedicinebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
