import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialPrimaryLandingPageComponent } from './presidential-primary-landing-page.component';

describe('PresidentialPrimaryLandingPageComponent', () => {
  let component: PresidentialPrimaryLandingPageComponent;
  let fixture: ComponentFixture<PresidentialPrimaryLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentialPrimaryLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialPrimaryLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
