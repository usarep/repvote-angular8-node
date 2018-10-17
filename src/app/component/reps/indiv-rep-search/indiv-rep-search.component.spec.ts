import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepSearchComponent } from './indiv-rep-search.component';

describe('IndivRepSearchComponent', () => {
  let component: IndivRepSearchComponent;
  let fixture: ComponentFixture<IndivRepSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
