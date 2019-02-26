import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialPrimariesSuccinctComponent } from './presidential-primaries-succinct.component';

describe('PresidentialPrimariesSuccinctComponent', () => {
  let component: PresidentialPrimariesSuccinctComponent;
  let fixture: ComponentFixture<PresidentialPrimariesSuccinctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentialPrimariesSuccinctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialPrimariesSuccinctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
