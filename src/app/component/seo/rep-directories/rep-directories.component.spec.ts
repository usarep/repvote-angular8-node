import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepDirectoriesComponent } from './rep-directories.component';

describe('RepDirectoriesComponent', () => {
  let component: RepDirectoriesComponent;
  let fixture: ComponentFixture<RepDirectoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepDirectoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepDirectoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
