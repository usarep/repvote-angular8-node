import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLinkSrComponent } from './active-link-sr.component';

describe('ActiveLinkSrComponent', () => {
  let component: ActiveLinkSrComponent;
  let fixture: ComponentFixture<ActiveLinkSrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveLinkSrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveLinkSrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
