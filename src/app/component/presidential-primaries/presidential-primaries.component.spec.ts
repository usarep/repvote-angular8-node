import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentialPrimariesComponent } from './presidential-primaries.component';

describe('PresidentialPrimariesComponent', () => {
  let component: PresidentialPrimariesComponent;
  let fixture: ComponentFixture<PresidentialPrimariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentialPrimariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentialPrimariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
