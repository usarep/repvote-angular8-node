import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillInfo } from 'src/app/repModel/vote.model';
import { ActivatedRoute } from '@angular/router';
import { BillSummaryService } from 'src/app/repService/bill-summary.service';



// declare var $:JQueryStatic;

import * as $ from '../../../../../node_modules/jquery/dist/jquery.min.js';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/shared/subscription-util.js';

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.css']
})
export class BillSummaryComponent implements OnInit, OnDestroy {

  billInfo : BillInfo;
  subscriptionParam;
  _loading = true;
  _congress;
  _docType;
  _docNumber;

  billName: string;
  congressStr: string;
  extUrl: string;

  // [innerHTML]="{{ billInfo.crsSummary }}"

  constructor( private _route: ActivatedRoute,
      private _billSummaryService: BillSummaryService)
  {
  }

  subscriptionBillSummary: Subscription;

  ngOnInit() {
      this._loading = true;

      this.subscriptionParam = this._route.params.subscribe(
          params => {
            this._loading = true;
            this._congress = +params['congress'];
            this._docType = params['docType'];
            this._docNumber = +params['docNumber'];

            this.subscriptionBillSummary = this._billSummaryService.getBillSummaryStatusListener()
                  .subscribe(res => {
                    console.log("billSummaryService(): our info: " + this._congress + ", " + this._docType + " " + this._docNumber);

                    // verify that the data is for this particular set of params
                    if (this._congress === res.congress && this._docType === res.docType && this._docNumber === res.docNumber) {
                      this.billInfo = res.billData;
                      console.log(this.billInfo);
                      this.cleanStuff();
                      this.computeExtUrl();

                    }
                    else {
                      console.log("stale bill data, skipping. res=", res);
                    }
                    this._loading = false;


              });

              this._billSummaryService.fetchBillSummary(this._congress, this._docType, this._docNumber);
          });

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.subscriptionBillSummary);
    SubscriptionUtil.unsubscribe(this.subscriptionParam);
  }

  // kludge. some stuff in scraped html need to be cleaned.
  cleanStuff() {
      $( document ).ready(function() {
      // console.log("jQuery is ready");

      // nav links
      $('a').filter(function (index) {
          return $(this).text() === "ABOUT SUMMARIES";
          }).parent().remove();


      $('a').filter(function (index) {
          return $(this).text() === "Back to Bill Summary and Status";
      }).parent().remove();


      $('h1').replaceWith(function(){
          return $("<h3 />", {html: $(this).html()}).addClass('text-center');
      });

     // Print, share buttons
      $('.locshare-toolbar').remove();

      });

      /*

      new link format:

      House bill, HR 1806
      https://www.congress.gov/bill/114th-congress/house-bill/1806

      CoSponsors: https://www.congress.gov/bill/114th-congress/house-bill/1806/cosponsors

      indexTermsUrl: https://www.congress.gov/bill/114th-congress/house-bill/1806/subjects

      Member: https://www.congress.gov/member/lamar-smith/S000583
      (lamar-smith can be any string)

      Related bills:
      https://www.congress.gov/bill/114th-congress/house-bill/1806/related-bills


      H RES format: H.Res.271 is now
      https://www.congress.gov/bill/114th-congress/house-resolution/271/related-bills

      S.1187 (senate)
      https://www.congress.gov/bill/114th-congress/senate-bill/1187/related-bills

      OLD Format:
      http://thomas.loc.gov/cgi-bin/bdquery/z?d114:HE00271:   -- H.Res.271 114th congress

      http://thomas.loc.gov/cgi-bin/bdquery/z?d114:HR00035:  -- HR 35

      http://thomas.loc.gov/cgi-bin/bdquery/z?d114:SN01187:  S 1187


      */

  }

  private computeExtUrl() {
      if (this.billInfo
          && this._docType
          && this._docNumber
          && this._congress
      )
      {
          /*
          format: https://www.congress.gov/bill/114th-congress/house-bill/1806

          */
          let urlPart = "";
          this.billName = "";
          this.congressStr = "";
          let nomination = false;


          if (this._docType.trim().toUpperCase() === 'HR') {
              urlPart = "house-bill";
              this.billName = "House Bill H.R. ";
          }
          else if (this._docType.trim().toUpperCase() === 'S') {
              urlPart = "senate-bill";
              this.billName = "Senate Bill S ";
          }
          else if (this._docType.trim().toUpperCase() === 'HRES') {
              urlPart = "house-resolution";
              this.billName = "House Resolution H.Res ";
          }
          else if (this._docType.trim().toUpperCase() === 'SRES') {
              urlPart = "senate-resolution";
              this.billName = "Senate Resolution S.Res ";
          }
          else if (this._docType.trim().toUpperCase() === 'HJRES') {
              urlPart = "house-joint-resolution";
              this.billName = "House Joint Resolution H.J.Res ";
          }
          // https://www.congress.gov/bill/114th-congress/senate-joint-resolution/23
          else if (this._docType.trim().toUpperCase() === 'SJRES') {
              urlPart = "senate-joint-resolution";
              this.billName = "Senate Joint Resolution S.J.Res ";
          }
          else if (this._docType.trim().toUpperCase() === 'HCONRES') {
              urlPart = "house-concurrent-resolution";
              this.billName = "House Concurrent Resolution H.Con.Res  ";
          }
          else if (this._docType.trim().toUpperCase() === 'SCONRES') {
              urlPart = "senate-concurrent-resolution";
              this.billName = "Senate Concurrent Resolution S.Con.Res   ";
          }
          else if (this._docType.trim().toUpperCase() === 'PN') {
              // https://www.congress.gov/nomination/115th-congress/56
              this.billName = "Nomination  ";
              nomination = true;
          }
          // else, it could be PN or Treaty Doc, or something else.
          else {
              console.log("docType" + this._docType);
              this.billName = this._docType.trim();
              urlPart = null;

          }

          if (urlPart) {
              this.extUrl = "https://www.congress.gov/bill/"
                  + this._congress + "th-congress/"
                  + urlPart
                  + "/"
                  + this._docNumber;
          }
          else if (nomination)
          {
              this.extUrl = "https://www.congress.gov/nomination/"
                      + this._congress + "th-congress/"
                      + this._docNumber;
          }



          this.congressStr = this._congress + "th Congress";

      }
  }

}
