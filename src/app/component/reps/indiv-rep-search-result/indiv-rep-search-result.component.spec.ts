import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepSearchResultComponent } from './indiv-rep-search-result.component';

describe('IndivRepSearchResultComponent', () => {
  let component: IndivRepSearchResultComponent;
  let fixture: ComponentFixture<IndivRepSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
