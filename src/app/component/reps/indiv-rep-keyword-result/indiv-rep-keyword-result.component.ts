import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { RollCallInfo, RepVoteKeywordDetail, VoteMetaId2BillId } from 'src/app/repModel/vote.model';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RepVotesService } from 'src/app/repService/rep-votes.service';
import { BillSummaryService } from 'src/app/repService/bill-summary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-indiv-rep-keyword-result',
  templateUrl: './indiv-rep-keyword-result.component.html',
  styleUrls: ['./indiv-rep-keyword-result.component.css']
})
export class IndivRepKeywordResultComponent implements OnInit, OnChanges, OnDestroy {

  _repVoteKeywordDetail: RepVoteKeywordDetail;

  subscriptionParam;
  _chamber: Chamber;
  _repId: string;
  _repName: string;
  _topic: string;
  _topicType: string; // policy-area or legislative-subject
  _loading = false;

  _topicTypeDesc: string; // if policy-area, then Policy Area. etc.

  constructor(private _route: ActivatedRoute
             , private _router: Router
             , private _repVotesService: RepVotesService
             , private _billSummaryService: BillSummaryService)
  { }

  subscriptionRepKeywordDetail: Subscription;
 ngOnInit() {
     this._loading = true;
   this.subscriptionParam = this._route.params.subscribe(
     params => {
       this._loading = true;
       // house or  senate
       const chamberStr = String(params['chamber']).toLowerCase().trim();
       this._chamber = SupportedChambers[chamberStr];

       // repId - case sensitive on server when looking up repName
       this._repId = String(params['rep']).trim();

       this._topic = String(params['topic']).trim();
       this._topicType = String(params['topicType']).trim();

       if (this._topicType === 'policy-area') {
         this._topicTypeDesc = 'Policy Area';
       }
       else if (this._topicType === 'legislative-subject') {
        this._topicTypeDesc = 'Legislative Subject';
      }

       console.log(this._chamber, this._repId, this._topic, this._topicType);

       this.subscriptionRepKeywordDetail = this._repVotesService.getRepKeywordDetailStatusListener()
         .subscribe(res => {
           console.log("IndivRepKeywordResultComponent.ngOnInit()");
           console.log(res);

           this._loading = false;

           if (this._chamber === res.chamber && this._repId === res.repId && this._topic === res.topic && this._topicType === res.topicType) {
            this._repVoteKeywordDetail = res.repVoteKeywordDetail; // <RepVoteKeywordDetail>res;
           }

           else {
             console.log("stale data,skipping ");
           }
         });

       this._repVotesService.fetchRepVoteKeywordDetail(
         this._chamber, this._repId, this._topic, this._topicType);


     }
   );
 }

 ngOnChanges(changes: SimpleChanges) {
     console.log("from IndivRepResultComponent.ngOnChanges() ");
     console.log(this._repVoteKeywordDetail);
 }

 ngOnDestroy() {
     this.subscriptionParam.unsubscribe();
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

//  billSummaryOld(voteMetaDataId) {
//      console.log("billSummary2 called");
//      const sub = this._billSummaryService.getBillId(voteMetaDataId).subscribe(res => {
//          const vmId2BillId: VoteMetaId2BillId = <VoteMetaId2BillId>res;
//        if (vmId2BillId && vmId2BillId.billId) {
//          this._router.navigate(['/billSummary', vmId2BillId.billId]);
//        }
//        else {
//              console.log("no billId found for voteMetaDataId=" + voteMetaDataId);
//        }
//      });


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
