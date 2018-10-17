import { Component, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-link',
  templateUrl: './issue-link.component.html',
  styleUrls: ['./issue-link.component.css']
})
export class IssueLinkComponent implements OnChanges {

  @Input() issue;

  _billSummaryUrl: string;

  constructor(private _router : Router)    {}
  /*
  <a [routerLink]="['/foo', param, param2 ]"> text </a>
  */

  ngOnChanges(changes: SimpleChanges) {

      // console.log("IssueLinkComponent.ngOnChanges()");

      this._billSummaryUrl = this.computeBillSummaryUrl();

  }

  computeBillSummaryUrl() {
      // console.log("computeBillSummaryUrl() called");
      if (this.issue) {
          let url = "";
          if (this.issue.docType
              && this.issue.docType.toLowerCase().trim().endsWith("amdt")) {
              url = '/amendmentSummary';
          }
          else {
              url = '/billSummary';
          }
          return url;
      }
  }

}
