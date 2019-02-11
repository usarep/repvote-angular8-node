import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialPrimaryTableComponent } from './presidential-primary-table.component';

describe('PresidentialPrimaryTableComponent', () => {
  let component: PresidentialPrimaryTableComponent;
  let fixture: ComponentFixture<PresidentialPrimaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentialPrimaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialPrimaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
