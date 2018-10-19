import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBillForRepComponent } from './search-bill-for-rep.component';

describe('SearchBillForRepComponent', () => {
  let component: SearchBillForRepComponent;
  let fixture: ComponentFixture<SearchBillForRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBillForRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBillForRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
