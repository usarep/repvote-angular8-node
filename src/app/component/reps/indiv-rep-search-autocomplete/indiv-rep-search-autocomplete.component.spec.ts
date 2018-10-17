import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepSearchAutocompleteComponent } from './indiv-rep-search-autocomplete.component';

describe('IndivRepSearchAutocompleteComponent', () => {
  let component: IndivRepSearchAutocompleteComponent;
  let fixture: ComponentFixture<IndivRepSearchAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepSearchAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepSearchAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
