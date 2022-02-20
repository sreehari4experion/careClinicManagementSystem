import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewconsultationComponent } from './viewconsultation.component';

describe('ViewconsultationComponent', () => {
  let component: ViewconsultationComponent;
  let fixture: ComponentFixture<ViewconsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewconsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
