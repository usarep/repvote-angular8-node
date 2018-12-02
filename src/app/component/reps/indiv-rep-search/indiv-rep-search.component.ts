import { Component, OnDestroy, Input, SimpleChanges, OnChanges, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chamber } from 'src/app/repModel/chamber.model';
import { Rep } from 'src/app/repModel/rep.model';
import { RepNamesService } from 'src/app/repService/rep-names.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DataUtil } from 'src/app/util/data-util';

@Component({
  selector: 'app-indiv-rep-search',
  templateUrl: './indiv-rep-search.component.html',
  styleUrls: ['./indiv-rep-search.component.css']
})
export class IndivRepSearchComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() _chamber: Chamber;
  @ViewChild('search') search;

  states = DataUtil.US_STATE;

  _prevChamber: Chamber = null;

   _MAX_REPS = 1;
   _isMaxRepsInfoVisible = false;
   _selectedItems: any[] = [];
   _searchStr: string;
   _allReps: Rep[] = []; // those who should be searched for strFragment
  _matchingReps: Rep[] = [];

  // 11/27/18: currentReps vs allInclusiveReps (includes historical)
  currentReps: Rep[] = []; // current office holders
  allInclusiveReps: Rep[] = [];
  showHistorical = false;  // show only current reps by default
  slideToggleColor = "primary";

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
      search: [''],
      state: [''] // used only on client side. not by server
    });
  }

  ngOnInit() {



    this.subscription = this._repDataService.getRepStatusListener()
      .subscribe( res => {
        console.log("indiv rep search", res);

        // if user switches between house and senate, make sure the state is cleared
        // we keep the historical to whatever it was
        const reset = {};
        reset['search'] = '';
        reset['state'] = '';
        this._searchForm.patchValue(reset);


          if (this._chamber === res.chamber) {
            this.allInclusiveReps = res.reps;
            this.currentReps = this.allInclusiveReps.filter(rep => rep.isCurrent);

            if (this.showHistorical) {
              this._allReps = this.allInclusiveReps;
            }
            else {
              this._allReps = this.currentReps;
            }
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

  ngAfterViewInit() {
    console.log("search");
    console.log(this.search);
    this.search.nativeElement.focus();
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

  toggleHistorical() {
    this.showHistorical = !this.showHistorical;
    this.updateSelection();

    /*
    let reps: Rep[];
    if (this.showHistorical) {
      reps = this.allInclusiveReps;
    }
    else {
      reps = this.currentReps;
    }

    // if there is a state filter, apply it

    console.log("toggleHistorical() - _searchForm", this._searchForm);
    const strFragment = this._searchForm.value.search;

    this.computeMatchingReps(strFragment);
    */

    this.search.nativeElement.focus();
  }




  public indivReps() {

    console.log("indivReps() called");
    this._router.navigate(['/vote', this._chamber.paramName, this._selectedItems[0].value]);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  stateSelectionChange(event) {
    console.log("state selecton change. event=", event);
    this.updateSelection();

    this.search.nativeElement.focus();

  }

  private updateSelection() {

    // recompute _allReps and _matchingReps
    let reps: Rep[];

    if (this.showHistorical) {
      reps = this.allInclusiveReps;
    }
    else {
      reps = this.currentReps;
    }

    // filter by state
    const stateAbbr = this._searchForm.value.state;

    this._allReps = this.applyStateFilter(reps, stateAbbr);

    const strFragment = this._searchForm.value.search;
    this.computeMatchingReps(strFragment);
  }

  // apply the state filter to the input reps array
  private applyStateFilter(reps: Rep[], stateAbbr: string): Rep[]
  {
    if (!stateAbbr) {
      return reps;
    }

    const filteredReps = reps.filter(rep => {
      const lowerStateAbbr = stateAbbr.toLowerCase();
      if (rep.state && rep.state.toLowerCase() === lowerStateAbbr) {
        return true;
      }
      else {
        return false;
      }
    });
    return filteredReps;
  }

}
