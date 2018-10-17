import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAreaCountsComponent } from './policy-area-counts.component';

describe('PolicyAreaCountsComponent', () => {
  let component: PolicyAreaCountsComponent;
  let fixture: ComponentFixture<PolicyAreaCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyAreaCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAreaCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
