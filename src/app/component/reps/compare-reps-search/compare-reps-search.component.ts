import { Component, Input, SimpleChanges, OnChanges, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Rep } from 'src/app/repModel/rep.model';
import { DiffData } from 'src/app/repModel/vote.model';
import { RepNamesService } from 'src/app/repService/rep-names.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

@Component({
  selector: 'app-compare-reps-search',
  templateUrl: './compare-reps-search.component.html',
  styleUrls: ['./compare-reps-search.component.css']
})
export class CompareRepsSearchComponent implements OnInit, OnChanges , OnDestroy, AfterViewInit {
  @Input() _chamber;
  @ViewChild('search') search;

   _MAX_COMPARE = 2;
   _isMaxCompareInfoVisible = false;

   _searchStr: string;
  _searchForm;

  // list of all reps
   _allReps: Rep[] = [];
   _selectedReps: any[] = []; // those reps that have been selected by user so far
   _remainingReps: Rep[] = []; // _allReps - _selectedReps
  _matchingReps: Rep[] = []; // those reps that match the user's typed search string amongst _remainingReps

  _diffData: DiffData;

   _repDataLoading = false;

   partyColor: {
    D: 'btn-info',  // blue
    R: 'btn-danger', // red

   };

   private subscription;

  initialized = false;

  constructor(
     public _repDataService: RepNamesService,
     public _router: Router,
     public fb: FormBuilder)
  {
     this._searchForm = fb.group({
      search: ['']
    });
  }

  ngOnInit() {

    this._repDataLoading = true;

    this.subscription = this._repDataService.getRepStatusListener()
    .subscribe(
      res => {
        console.log("compareReps subscription", res);

        if (this._chamber === res.chamber)
        {
          this._allReps = res.reps;
          this._remainingReps = res.reps.slice();
          this.computeMatchingReps("");

          this._repDataLoading = false;
          this._selectedReps.length = 0;
          this._diffData = null;
        }
        else {
          console.log("chambers dont match. probably stale data; skipping");
        }
      }
    );

    this._repDataService.fetchReps(this._chamber);
    this.initialized = true;

  }

  ngOnChanges(changes: SimpleChanges) {

    // call this only after ngOnInit has been called once
    if (this.initialized) {
      this._repDataLoading = true;

      this._repDataService.fetchReps(this._chamber);

    }
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.subscription);
  }

  ngAfterViewInit() {
    this.search.nativeElement.focus();
  }

  public onKeyPress(strFragment) {
    // user has typed stuff in the search box.
    // current value is strFragment.
    // _searchStr doesn't reflect this change yet
    console.log("in onKeyPress() strFragment=" + strFragment + ", _searchStr=" + this._searchStr);
    this.computeMatchingReps(strFragment);
    this._searchStr = strFragment;
  }

  public computeMatchingReps(strFragment: string) {
    /*
    change _matchingReps consistent with strFragment
    */

    // step 1: if strFragment is empty or too small (for now 0 char), ignore it
    if (!strFragment|| strFragment.trim().length <= 0)
    {
      this._matchingReps = this._remainingReps;
      return;
    }

    const tmp: Rep[] = [];
    for (let i = 0; i < this._remainingReps.length; i++) {
      const rep: Rep = this._remainingReps[i];
      if (rep.label.indexOf(strFragment.toLowerCase()) >= 0) {
        tmp.push(rep);
      }
    }
    this._matchingReps = tmp;
  }

  public onSelected(selected: Rep) {
        console.log(selected);
        // console.log(selected.originalObject);
        if (selected) {
          this._selectedReps.push(selected);
          console.log(this._selectedReps);

          // remove selected from _remainingReps
          const index = this._remainingReps.indexOf(selected);
          if (index >= 0) {
            this._remainingReps.splice(index, 1);
          }

          // submit if two reps selected
          if (this._selectedReps.length > 1) {
            this.compareReps();
          }
          else {
            // clear out _searchStr so remainingReps are visible
            this._searchStr = "";

            // put focus back on the input field
            this.search.nativeElement.focus();

            // slice() will create a shallow copy of the array;
            // elements in it are references to objects, and those references are copied,
            this._matchingReps = this._remainingReps.slice();
          }
        }
  }

  private deleteItem(item) {

    if (!this._selectedReps) {
      console.log("_items is empty");
      return;
    }

    const index = this._selectedReps.indexOf(item);

    console.log("deleting index=" + index);
    console.log(item);

    if (index >= 0) {
      this._selectedReps.splice(index, 1);
    }

    // recreate _remainingReps
    // since we are comparing two reps, and submitting the moment user has selected two reps
    // there can be at most one item in _selectedReps. so once item is deleted from it, _selectedReps is empty
    this._remainingReps = this._allReps.slice();
    this._matchingReps = this._remainingReps.slice();

  }

  private showMaxCompareInfo() {
    this._isMaxCompareInfoVisible = true;
  }

  private hidMaxCompareInfo() {
    this._isMaxCompareInfoVisible = false;
  }

  private getCssClass(party) {
    let result = "btn selected-rep ";

     // red for republican, blue for democrat, orange for everything else
    if (!party) {
      result += " btn-warning ";
    }
    else if (party.toUpperCase() === 'R') {
      result += " btn-danger ";
    }
    else if (party.toUpperCase() === 'D') {
      result += " btn-info ";
    }
    else {
      result += " btn-warning ";
    }

    return result;

  }

  public compareReps() {
    console.log("compareReps() called");
    const csvNameIds = this._selectedReps[0].value + "," + this._selectedReps[1].value;
    this._router.navigate(['/compare', this._chamber.paramName, csvNameIds]);

  }


}
