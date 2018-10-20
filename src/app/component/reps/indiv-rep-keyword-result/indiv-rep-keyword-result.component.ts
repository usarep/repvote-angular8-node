import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { RollCallInfo, RepVoteKeywordDetail, VoteMetaId2BillId } from 'src/app/repModel/vote.model';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RepVotesService } from 'src/app/repService/rep-votes.service';
import { BillSummaryService } from 'src/app/repService/bill-summary.service';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

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

  _voteType: string; // yes, no, present, absent, wasMember

  _repOrSenatorStr: string; // value is "Representative" or "Senator"

  _voteTypeStr: string; // if voteType is available, and is not wasMember, we show it
  _voteTypeStrPre: string; // "where member was" absent, or "voting" present

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

       // how to address this person -- "Representative" or "Senator"?
       if (this._chamber.id === 1) {
         this._repOrSenatorStr = "Representative";
       }
       else if (this._chamber.id === 2) {
        this._repOrSenatorStr = "Senator";
       }
       else {
          this._repOrSenatorStr = "Rep"; // default
       }

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
        // voteType
        const tmpVoteType = params['voteType'];
        if (tmpVoteType) {
          this._voteType = String(tmpVoteType);

          if (this._voteType === 'wasMember') {
            this._voteTypeStr = null; // all vote types
          }
          else if (this._voteType === 'absent') {
            this._voteTypeStrPre = "where member was";
            this._voteTypeStr = this._voteType;
          }
          else if (this._voteType === 'yeah') {
            this._voteTypeStrPre = "voting";
            this._voteTypeStr = "yay";
          }
          else {
            this._voteTypeStrPre = "voting";
            this._voteTypeStr = this._voteType;
          }
        }
        else {
          this._voteType = null;
          this._voteTypeStr = null;
        }

       console.log(this._chamber, this._repId, this._topic, this._topicType, this._voteType);

       this.subscriptionRepKeywordDetail = this._repVotesService.getRepKeywordDetailStatusListener()
         .subscribe(res => {
           console.log("IndivRepKeywordResultComponent.ngOnInit()");
           console.log(res);

           this._loading = false;

           if (this._chamber === res.chamber
             && this._repId === res.repId
             && this._topic === res.topic
             && this._topicType === res.topicType
             && this._voteType === res.voteType) {
              this._repVoteKeywordDetail = res.repVoteKeywordDetail; // <RepVoteKeywordDetail>res;
           }

           else {
             console.log("stale data,skipping ");
           }
        });  // subscriptionRepKeywordDetail

       this._repVotesService.fetchRepVoteKeywordDetail(
         this._chamber, this._repId, this._topic, this._topicType, this._voteType);


     }
   );
 }

 ngOnChanges(changes: SimpleChanges) {
    //  console.log("from IndivRepResultComponent.ngOnChanges() ");
    //  console.log(this._repVoteKeywordDetail);
 }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.subscriptionParam);
    SubscriptionUtil.unsubscribe(this.subscriptionRepKeywordDetail);
 }

//  getVoteIcon(vote) {
//   if (!vote) {
//      return "";
//   }


//   let glyph = " glyphicon ";

//      // YEA or YES
//    if (vote === 'YEA' || vote === "YES") {
//      glyph += " glyphicon-thumbs-up";
//    }

//    else if (vote === "NAY" || vote === "NO") {
//      glyph += " glyphicon-thumbs-down";
//    }

//    else if (vote === "PRESENT") {
//      glyph += " glyphicon-unchecked";
//    }

//    else {
//      glyph += " glyphicon-minus";
//    }


//    return glyph;

//  }

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
