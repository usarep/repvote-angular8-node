import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepSelectCardComponent } from './rep-select-card.component';

describe('RepSelectCardComponent', () => {
  let component: RepSelectCardComponent;
  let fixture: ComponentFixture<RepSelectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepSelectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
