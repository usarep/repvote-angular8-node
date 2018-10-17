import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollCallBillInfoComponent } from './roll-call-bill-info.component';

describe('RollCallBillInfoComponent', () => {
  let component: RollCallBillInfoComponent;
  let fixture: ComponentFixture<RollCallBillInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollCallBillInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollCallBillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
