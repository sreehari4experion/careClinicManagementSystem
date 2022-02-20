import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconsultationComponent } from './addconsultation.component';

describe('AddconsultationComponent', () => {
  let component: AddconsultationComponent;
  let fixture: ComponentFixture<AddconsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddconsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
