import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepPhotoNameComponent } from './rep-photo-name.component';

describe('RepPhotoNameComponent', () => {
  let component: RepPhotoNameComponent;
  let fixture: ComponentFixture<RepPhotoNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepPhotoNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepPhotoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
