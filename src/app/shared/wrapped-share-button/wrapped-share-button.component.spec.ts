import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrappedShareButtonComponent } from './wrapped-share-button.component';

describe('WrappedShareButtonComponent', () => {
  let component: WrappedShareButtonComponent;
  let fixture: ComponentFixture<WrappedShareButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrappedShareButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrappedShareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
