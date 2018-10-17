import { Component, OnDestroy, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Chamber } from 'src/app/repModel/chamber.model';
import { Rep } from 'src/app/repModel/rep.model';
import { RepNamesService } from 'src/app/repService/rep-names.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-indiv-rep-search',
  templateUrl: './indiv-rep-search.component.html',
  styleUrls: ['./indiv-rep-search.component.css']
})
export class IndivRepSearchComponent implements OnInit, OnChanges, OnDestroy {

  @Input() _chamber: Chamber;

  _prevChamber: Chamber = null;

   _MAX_REPS = 1;
   _isMaxRepsInfoVisible = false;
   _selectedItems: any[] = [];
   _searchStr: string;
   _allReps: Rep[] = [];
   _matchingReps: Rep[] = [];

   private subscription;

   _repDataLoading = false;


  partyColor: {
    D: 'btn-info',  // blue
    R: 'btn-danger', // red

  };

  _searchForm;

  constructor(
     private _repDataService: RepNamesService,
     private _router: Router,
     public fb: FormBuilder
  ) {

    this._searchForm = fb.group({
      search: ['']
    });
  }

  ngOnInit() {

    this.subscription = this._repDataService.getRepStatusListener()
      .subscribe( res => {
          console.log("indiv rep search", res);

          if (this._chamber === res.chamber) {
            this._allReps = res.reps;
            this.computeMatchingReps("");

            this._repDataLoading = false;
            this._selectedItems.length = 0;
          }
          else {
            console.log("chambers dont match. probably stale data; skipping");
          }


      });

      this._repDataService.fetchReps(this._chamber);

      this.initialized = true;


  }

  initialized = false;

  ngOnChanges(changes: SimpleChanges) {

    console.log("indivReps.ngOnChanges()");

    // call this only after ngOnInit has been called once
    if (this.initialized) {

      // change can be because user has switched from senate to house and viceversa
      // or because user has changed the search string

      if (!this._prevChamber || this._chamber !== this._prevChamber) {

        console.log("indivReps.ngOnChanges() - chamber change");
        this._repDataLoading = true;

        this._repDataService.fetchReps(this._chamber);

      }
      else {
        // user has changed the search string. do nothing here because onKeyPress() will
        // handle it
        console.log("indivReps.ngOnChanges() - no chamber change");
      }

    }



  }

  public onSelected(selected: Rep) {
        console.log(selected);
        // console.log(selected.originalObject);
        if (selected) {
          this._selectedItems.push(selected);
          console.log(this._selectedItems);
          // submit the form
          this.indivReps();
        }

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
      this._matchingReps = this._allReps;
      return;
    }

    const tmp: Rep[] = [];
    for (let i = 0; i < this._allReps.length; i++) {
      const rep: Rep = this._allReps[i];
      if (rep.label.indexOf(strFragment.toLowerCase()) >= 0) {
        tmp.push(rep);
      }
    }
    this._matchingReps = tmp;
  }


  public indivReps() {

    console.log("indivReps() called");
    this._router.navigate(['/vote', this._chamber.paramName, this._selectedItems[0].value]);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
