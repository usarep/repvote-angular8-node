import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { Chamber } from 'src/app/repModel/chamber.model';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';
import { RepNamesService } from 'src/app/repService/rep-names.service';
import { Router } from '@angular/router';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

@Component({
  selector: 'app-indiv-rep-search-autocomplete',
  templateUrl: './indiv-rep-search-autocomplete.component.html',
  styleUrls: ['./indiv-rep-search-autocomplete.component.css']
})
export class IndivRepSearchAutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  @Input() _chamber : Chamber;

  _MAX_REPS = 1;
  _isMaxRepsInfoVisible = false;
  _items: any[] = [];
  searchStr: string;
  dataService: CompleterData;
  subscription;

  _repDataLoading = false;


 partyColor: {
   D: 'btn-info',  // blue
   R: 'btn-danger', // red

 };

  initialized = false;

 constructor(
    public completerService: CompleterService,
    public _repDataService: RepNamesService,
    public _router: Router
 ) {
   // this.dataService = completerService.local(this.searchData, 'color', 'color');
 }

  ngOnInit() {

    this._repDataLoading = true;

    // set up the subscription. but
    this.subscription = this._repDataService.getRepStatusListener()
     .subscribe(
       res => {
         console.log("indivReps subscription", res);

         // https://github.com/oferh/ng2-completer/blob/master/src/services/completer-service.ts
         // completerService.local(data, searchField, titleField )
         this.dataService = this.completerService.local(
           res.reps,
           'label',
           'label');

         this._repDataLoading = false;
         this._items.length = 0;
       }
    );

    this._repDataService.fetchReps(this._chamber);
    this.initialized = true;
  }

 ngOnChanges(changes: SimpleChanges) {

   // call this only if a change event happens after ngOnInit has completed
   if (this.initialized) {

    this._repDataLoading = true;

    this._repDataService.fetchReps(this._chamber);

   }


 }

 public onSelected(selected: CompleterItem) {
       console.log(selected);
       // console.log(selected.originalObject);
       if (selected && selected.originalObject) {
         this._items.push(selected.originalObject);
         console.log(this._items);
         // submit the form
         this.indivReps();
       }

 }

 private deleteItem(item) {

   if (!this._items) {
     console.log("_items is empty");
     return;
   }


   const index = this._items.indexOf(item);

   console.log("deleting index=" + index);
   console.log(item);

   if (index >= 0) {
     this._items.splice(index, 1);
   }

 }

 private showMaxCompareInfo() {
   this._isMaxRepsInfoVisible = true;
 }

 private hidMaxCompareInfo() {
   this._isMaxRepsInfoVisible = false;
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

 public indivReps() {

   console.log("indivReps() called");
   this._router.navigate(['/vote', this._chamber.paramName, this._items[0].value]);

 }

 ngOnDestroy() {
   SubscriptionUtil.unsubscribe(this.subscription);
 }

}
