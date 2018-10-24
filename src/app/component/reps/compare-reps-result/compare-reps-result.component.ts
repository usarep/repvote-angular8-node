import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { RollCallInfo, DiffData } from 'src/app/repModel/vote.model';
import { SupportedChambers, Chamber } from 'src/app/repModel/chamber.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DiffDataService } from 'src/app/repService/diff-data.service';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-compare-reps-result',
  templateUrl: './compare-reps-result.component.html',
  styleUrls: ['./compare-reps-result.component.css']
})
export class CompareRepsResultComponent implements OnInit, OnChanges, OnDestroy  {

  _diffData: DiffData;

  _oldDiffData: DiffData;

  subscriptionParam;
  _chamber: Chamber;
  _csvRepIds: string;
  _loading = false;


 constructor( public _route: ActivatedRoute,
   public _diffDataService: DiffDataService,
   public titleService: Title,
   private _router: Router
 ) { }

  subscriptionDiffData: Subscription;

 ngOnInit() {
     this._loading = true;

   this.subscriptionParam = this._route.params.subscribe(
     params => {
       // house or  senate
       this._loading = true;
       const chamberStr = String(params['chamber']).toLowerCase().trim();
       this._chamber = SupportedChambers[chamberStr];

       // repId - case sensitive for repName
       this._csvRepIds = String(params['reps']).trim();

       console.log(this._chamber, this._csvRepIds);
       this.subscriptionDiffData = this._diffDataService.getDiffDataStatusListener()
         .subscribe(res => {
           console.log("CompareRepsResultComponent.ngOnInit() ", res);
           this._loading = false;

           // verify that the data is for this particular set of params
           if (this._chamber === res.chamber && this._csvRepIds === res.csvRepIds) {
            this._diffData = res.diffData;
             console.log(this._diffData);

             if (this._diffData && this._diffData.repNames && this._diffData.repNames.length >= 2) {
              this.titleService.setTitle("Compare voting records of " + this._diffData.repNames[0] + " and " + this._diffData.repNames[1]);
             }

           }
           else {
            console.log("stale diff data, skipping.");
            }


         });

       this._diffDataService.fetchDiffData(this._chamber, this._csvRepIds);

     }
   );
 }

 ngOnChanges(changes: SimpleChanges) {
     console.log("from CompareRepsResultComponent.ngOnChanges() ");
     console.log(this._diffData);
 }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.subscriptionDiffData);
    SubscriptionUtil.unsubscribe(this.subscriptionParam);


 }


 getVoteIcon(vote) {
   if (!vote) {
     return "";
   }


     let glyph = " glyphicon ";

     // YEA or YES
   if (vote === 'YEA' || vote === "YES") {
     glyph += " glyphicon-thumbs-up";
   }

   else if (vote === "NAY" || vote === "NO") {
     glyph += " glyphicon-thumbs-down";
   }

   else if (vote === "PRESENT") {
     glyph += " glyphicon-unchecked";
   }

   else {
     glyph += " glyphicon-minus";
   }


   return glyph;

 }

//  billSummaryOld(rollCallInfo: RollCallInfo) {
//      console.log("getBillInfo() called");
//      if (rollCallInfo) {
//          this._router.navigate(['/billSummary',
//              rollCallInfo.congress,
//              rollCallInfo.rollDocType,
//              rollCallInfo.rollDocNumber
//          ]);
//      }
//  }

 billSummary(rollCallInfo: RollCallInfo) {
     console.log("billSummary() called");
     if (rollCallInfo) {
         let url = "";
         if (rollCallInfo.rollDocType
             && rollCallInfo.rollDocType.toLowerCase().trim().endsWith("amdt")) {
             url = '/amendmentSummary';
         }
         else {
             url = '/billSummary';
         }
         this._router.navigate([url,
             rollCallInfo.congress,
             rollCallInfo.rollDocType,
             rollCallInfo.rollDocNumber
         ]);
     }
 }


}
