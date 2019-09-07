import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepDirComponent } from './rep-dir.component';

describe('RepDirComponent', () => {
  let component: RepDirComponent;
  let fixture: ComponentFixture<RepDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
