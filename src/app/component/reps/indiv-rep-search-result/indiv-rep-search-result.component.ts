import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepVotesService } from 'src/app/repService/rep-votes.service';
import { BillSummaryService } from 'src/app/repService/bill-summary.service';
import { RepVoteKeywordDetail } from 'src/app/repModel/vote.model';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

@Component({
  selector: 'app-indiv-rep-search-result',
  templateUrl: './indiv-rep-search-result.component.html',
  styleUrls: ['./indiv-rep-search-result.component.css']
})
export class IndivRepSearchResultComponent implements OnInit, OnDestroy {

  // sort of like IndivRepKeywordResultComponent, but params are different
  // the url will get screwed up if we mix params from the two, so this is a
  // separate component

  // url of the form search/:chamber/:rep/:searchStr

  _repVoteKeywordDetail: RepVoteKeywordDetail;

  subscriptionParam;
  _chamber: Chamber;
  _repId: string;
  _repName: string;
  _searchStr: string;

  subscriptionRepKeywordDetail: Subscription;

  _loading = false;
  _repOrSenatorStr: string; // value is "Representative" or "Senator"


  constructor(private _route: ActivatedRoute
    , private _router: Router
    , private _repVotesService: RepVotesService
    , private _billSummaryService: BillSummaryService)
  { }

  ngOnInit() {

    this._loading = true;
    this.subscriptionParam = this._route.params.subscribe(
      params => {
        this._loading = true;

        // search/:chamber/:rep/:searchStr

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

        this._searchStr = String(params['searchStr']).trim();

        console.log(this._chamber, this._repId, this._searchStr);

        this.subscriptionRepKeywordDetail = this._repVotesService.getRepSearchStatusListener()
         .subscribe(res => {
           console.log("IndivRepKeywordResultComponent.ngOnInit()");
           console.log(res);

           this._loading = false;

           if (this._chamber === res.chamber
             && this._repId === res.repId
             && this._searchStr === res.searchStr) {
              this._repVoteKeywordDetail = res.repVoteKeywordDetail; // <RepVoteKeywordDetail>res;  RepVoteKeywordDetail is the same model for keyword and search
           }

           else {
             console.log("stale data,skipping ");
           }
        });  // subscriptionRepKeywordDetail

       this._repVotesService.fetchRepSearchResult(
         this._chamber, this._repId, this._searchStr);

      });

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.subscriptionParam);
    SubscriptionUtil.unsubscribe(this.subscriptionRepKeywordDetail);
  }

}
