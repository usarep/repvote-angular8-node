import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepKeywordResultComponent } from './indiv-rep-keyword-result.component';

describe('IndivRepKeywordResultComponent', () => {
  let component: IndivRepKeywordResultComponent;
  let fixture: ComponentFixture<IndivRepKeywordResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepKeywordResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepKeywordResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
