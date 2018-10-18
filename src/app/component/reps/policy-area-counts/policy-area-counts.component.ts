import { Component, Input, OnInit } from '@angular/core';
import { KeywordCount } from 'src/app/repModel/vote.model';
import { Chamber } from 'src/app/repModel/chamber.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-area-counts',
  templateUrl: './policy-area-counts.component.html',
  styleUrls: ['./policy-area-counts.component.css']
})
export class PolicyAreaCountsComponent implements OnInit {

  @Input('data') public _policyAreaCounts: KeywordCount[] = [];

  @Input() _chamber: Chamber;
  @Input() _repId: string;
  @Input() _repName: string;

  showDetailed = true;

  constructor(public _router: Router) { }

  ngOnInit() {

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

    return glyph ;
  }

  // /repkeydet.htm?chamber_id=1&rep_name_id=foo&index_term=education

  detailedVote(policyAreaCount: KeywordCount) {

      console.log("detailedVote() called for policy area");
      this._router.navigate(['/vote',
        this._chamber.paramName,
        this._repId,
        'policy-area',
        policyAreaCount.topic]);
  }

  // voteType: yes, no, present, absent, wasMember

  detailedVote2(policyAreaCount, voteType) {
    console.log("detailedVote2() called for policy area");

    this._router.navigate(['/vote',
      this._chamber.paramName,
      this._repId,
      'policy-area',
      policyAreaCount.topic,
      voteType]);
  }

}
