import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLinkComponent } from './issue-link.component';

describe('IssueLinkComponent', () => {
  let component: IssueLinkComponent;
  let fixture: ComponentFixture<IssueLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
