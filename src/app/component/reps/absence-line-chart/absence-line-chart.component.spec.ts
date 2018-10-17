import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceLineChartComponent } from './absence-line-chart.component';

describe('AbsenceLineChartComponent', () => {
  let component: AbsenceLineChartComponent;
  let fixture: ComponentFixture<AbsenceLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
