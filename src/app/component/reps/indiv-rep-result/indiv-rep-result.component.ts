import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { RepVoteSummary } from 'src/app/repModel/vote.model';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RepVotesService } from 'src/app/repService/rep-votes.service';
import { Title } from '@angular/platform-browser';
import { RepUtil } from 'src/app/repUtil/rep-util';
import { repeat } from 'rxjs/operators';

@Component({
  selector: 'app-indiv-rep-result',
  templateUrl: './indiv-rep-result.component.html',
  styleUrls: ['./indiv-rep-result.component.css']
})
export class IndivRepResultComponent implements OnInit, OnChanges, OnDestroy {

  _repVoteSummary: RepVoteSummary;

  subscription;
  _chamber: Chamber;
  _repId: string;
  _repName: string;
  _loading = false;

  fullName: string; // if available. else, this value will be repName

  showKeywordCounts = true;
  showPolicyAreaCounts = true;

  // if breakdown by legislative subject or policy area is available, set this to true
  breakdownAvailable = false;

  constructor(public _route: ActivatedRoute
   , public _router: Router
   , public _repVotesService: RepVotesService
   , public titleService: Title
   )
 { }

 ngOnInit() {
   this._loading = true;
   this.subscription = this._route.params.subscribe(
     params => {
       // house or  senate
       this._loading = true;
       const chamberStr = String(params['chamber']).toLowerCase().trim();
       this._chamber = SupportedChambers[chamberStr];

       // repId - case sensitive for repName
       this._repId = String(params['rep']).trim();

       let bioGuide = false;
       // kludge: if repId doesn't have a 1- or 2-, it's a bioGuide
       if (this._repId.indexOf('-') < 0) {
         bioGuide = true;
       }

       console.log(this._chamber, this._repId, bioGuide);
       this._repVotesService.getRepVoteSummaryStatusListener()
         .subscribe(res => {

           console.log("IndivRepResultComponent.ngOnInit()", res);
           this._loading = false;

           if (this._chamber === res.chamber && this._repId === res.repId && bioGuide === res.isBioGuide) {
             this._repVoteSummary = res.repVoteSummary; // <RepVoteSummary>res;

             this.fullName = this.computeName();
             this.setTitle("Voting summary for " + this.fullName);

             //
             if (this._repVoteSummary &&
               ( (this._repVoteSummary.keywordSummary && this._repVoteSummary.keywordSummary.length > 0)
                 || (this._repVoteSummary.policyAreaSummary && this._repVoteSummary.policyAreaSummary.length > 0)))
             {
                  this.breakdownAvailable = true;

             }

             else {
               this.breakdownAvailable = false;
             }

           }
           else {
             console.log("stale data, skipping");
           }

         });

       this._repVotesService.fetchRepVoteSummary(this._chamber, this._repId, bioGuide);


     }
   );
 }

 ngOnChanges(changes: SimpleChanges) {
     console.log("from IndivRepResultComponent.ngOnChanges() ");
     console.log(this._repVoteSummary);
 }

 ngOnDestroy() {
     this.subscription.unsubscribe();
 }


  // return all bills for rep
  allBillsForRep() {

    // search/:chamber/:rep/:searchStr
    this._router.navigate(['/search',
      this._chamber.paramName,
      this._repId,
      "*" // searchStr
    ]);

  }

 getVoteIcon(vote) {
     if (!vote) { return ""; }


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


  return glyph ;
 }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  private computeName(): string {
    if (!this._repVoteSummary || !this._repVoteSummary.rep) {
      return this._repName;
    }
    else {
      const name = RepUtil.computeName(this._repVoteSummary.rep);
      if (name) {
        return name;
      }
      else {
        return this._repName;
      }
    }
  }
}
