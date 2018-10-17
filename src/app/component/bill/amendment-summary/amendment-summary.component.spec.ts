import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendmentSummaryComponent } from './amendment-summary.component';

describe('AmendmentSummaryComponent', () => {
  let component: AmendmentSummaryComponent;
  let fixture: ComponentFixture<AmendmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmendmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
