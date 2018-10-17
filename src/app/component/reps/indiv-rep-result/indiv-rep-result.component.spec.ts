import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepResultComponent } from './indiv-rep-result.component';

describe('IndivRepResultComponent', () => {
  let component: IndivRepResultComponent;
  let fixture: ComponentFixture<IndivRepResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
