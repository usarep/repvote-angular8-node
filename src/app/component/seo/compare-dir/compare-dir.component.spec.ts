import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDirComponent } from './compare-dir.component';

describe('CompareDirComponent', () => {
  let component: CompareDirComponent;
  let fixture: ComponentFixture<CompareDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
