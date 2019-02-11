import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialPrimariesV2Component } from './presidential-primaries-v2.component';

describe('PresidentialPrimariesV2Component', () => {
  let component: PresidentialPrimariesV2Component;
  let fixture: ComponentFixture<PresidentialPrimariesV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentialPrimariesV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialPrimariesV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
