import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Constants } from 'src/app/constants/constants';
import { AmendmentInfo } from 'src/app/repModel/vote.model';
import { BillSummaryService } from 'src/app/repService/bill-summary.service';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-amendment-summary',
  templateUrl: './amendment-summary.component.html',
  styleUrls: ['./amendment-summary.component.css']
})
export class AmendmentSummaryComponent implements OnInit, OnDestroy {

  amdtInfo : AmendmentInfo;
  subscriptionParam;
  _loading = true;
  _congress;
  _docType;
  _docNumber;


  /*
   format: https://www.congress.gov/amendment/114th-congress/senate-amendment/2918

  text:  https://www.congress.gov/amendment/114th-congress/senate-amendment/2918/text
  actions: https://www.congress.gov/amendment/114th-congress/senate-amendment/2918/actions
  cosponsors: https://www.congress.gov/amendment/114th-congress/senate-amendment/2918/cosponsors
  */
  extUrl: string; // congress.gov url
  amendmentName: string; // HAMDT -> House Amendment
  congressStr: string; // 114th Congress

  nameIdPrefix: string; // 1- or 2- for House/Senate respectively
  chamber: string; // House or Senate -- from shortName: H and S

  // [innerHTML]="{{ billInfo.crsSummary }}"

  constructor( private _route: ActivatedRoute,
    private _billSummaryService: BillSummaryService,
    private _titleService: Title)
  {
  }

  private subscriptionAmendmentSummaryStatus;

  ngOnInit() {
      this._loading = true;

      this.subscriptionParam = this._route.params.subscribe(
          params => {
              this._loading = true;
              this._congress = +params['congress'];
              this._docType = params['docType'];
              this._docNumber = +params['docNumber'];


            this.subscriptionAmendmentSummaryStatus = this._billSummaryService.getAmendmentSummaryStatusListener()
                  .subscribe(res => {
                    console.log("getAmendmentSummary() our info: " + this._congress + ", " + this._docType + " " + this._docNumber);


                    // verify that the data is for this particular set of params
                    if (this._congress === res.congress && this._docType === res.docType && this._docNumber === res.docNumber) {
                      this.amdtInfo = res.amendmentData;
                      console.log(this.amdtInfo);

                      this.computeExtUrl();

                      // for missing data, shortName should be H for HAMDT, S for SAMDT
                      let shortName = "";
                      if (this.amdtInfo.chamber && this.amdtInfo.chamber.shortName) {
                          shortName = this.amdtInfo.chamber.shortName;
                      }

                      else if (this._docType) {
                          shortName = this._docType; // kludge but will work
                      }
                      this.computeChamber(shortName);

                      //  {{ amendmentName }} {{ _docNumber }} , {{ congressStr }}
                      this._titleService.setTitle(
                        "Amendment Summary for " +
                        this.amendmentName + " " +
                        this._docNumber + " " +
                        this.congressStr
                      );

                    }

                    else {
                      console.log("stale amendment data, skipping. res=", res);
                    }

                    this._loading = false;



              });

            this._billSummaryService.fetchAmendmentSummary(this._congress, this._docType, this._docNumber);

          });

  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.subscriptionAmendmentSummaryStatus);
    SubscriptionUtil.unsubscribe(this.subscriptionParam);

  }

  // chamberShortName is 'H' or 'S'
  computeChamber(chamberShortName: string) {
      this.nameIdPrefix = "";
      this.chamber = null;

      if (!chamberShortName) {
          console.log("no chamberShortName");
          return;
      }
      if (chamberShortName.toUpperCase() === 'H') {
         // this.nameIdPrefix = "1-";
          this.chamber= "House";

      }
      else if (chamberShortName.toUpperCase() === 'S') {
          // this.nameIdPrefix = "2-";
          this.chamber= "Senate";
      }
      else {
          console.log("unknown chamberShortName=" + chamberShortName);
          this.chamber = null;
      }
  }

  private computeExtUrl() {
      if (this.amdtInfo
          && this._docType
          && this._congress
          && this._docNumber
      )
      {
          /*
          format: https://www.congress.gov/amendment/114th-congress/senate-amendment/2918

          */
          let amendment = "";
          this.amendmentName = "";
          this.congressStr = "";


          if (this._docType.trim().toUpperCase() === 'HAMDT') {
              amendment = "house-amendment";
              this.amendmentName = "House Amendment";
          }
          else if (this._docType.trim().toUpperCase() === 'SAMDT') {
              amendment = "senate-amendment";
              this.amendmentName = "Senate Amendment";
          }
          // else we don't know
          else {
              console.log("unknown amendmentType" + this._docType);
              return;
          }

        this.extUrl = Constants.CONGRESS_AMDT_URL_ROOT // "https://www.congress.gov/amendment/"
              + this._congress + "th-congress/"
              + amendment
              + "/"
              + this._docNumber;

          this.congressStr = this._congress + "th Congress";

      }
  }

}
