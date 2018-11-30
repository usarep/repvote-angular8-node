import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepProfileCardComponent } from './rep-profile-card.component';

describe('RepProfileCardComponent', () => {
  let component: RepProfileCardComponent;
  let fixture: ComponentFixture<RepProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepProfileCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
