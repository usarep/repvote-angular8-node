import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivRepVoteTableComponent } from './indiv-rep-vote-table.component';

describe('IndivRepVoteTableComponent', () => {
  let component: IndivRepVoteTableComponent;
  let fixture: ComponentFixture<IndivRepVoteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivRepVoteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivRepVoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
