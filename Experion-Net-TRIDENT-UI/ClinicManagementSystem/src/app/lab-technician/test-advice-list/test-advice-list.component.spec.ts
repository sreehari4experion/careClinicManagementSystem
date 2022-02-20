import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAdviceListComponent } from './test-advice-list.component';

describe('TestAdviceListComponent', () => {
  let component: TestAdviceListComponent;
  let fixture: ComponentFixture<TestAdviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAdviceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAdviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
