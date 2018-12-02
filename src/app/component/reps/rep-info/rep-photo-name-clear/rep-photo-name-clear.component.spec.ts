import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepPhotoNameClearComponent } from './rep-photo-name-clear.component';

describe('RepPhotoNameClearComponent', () => {
  let component: RepPhotoNameClearComponent;
  let fixture: ComponentFixture<RepPhotoNameClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepPhotoNameClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepPhotoNameClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
