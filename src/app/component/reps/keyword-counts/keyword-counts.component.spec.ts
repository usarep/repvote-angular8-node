import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCountsComponent } from './keyword-counts.component';

describe('KeywordCountsComponent', () => {
  let component: KeywordCountsComponent;
  let fixture: ComponentFixture<KeywordCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
