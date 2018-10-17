import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepLandingComponent } from './indiv-rep-landing.component';

describe('IndivRepLandingComponent', () => {
  let component: IndivRepLandingComponent;
  let fixture: ComponentFixture<IndivRepLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
