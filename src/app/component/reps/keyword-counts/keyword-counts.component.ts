import { Component, OnInit, Input } from '@angular/core';
import { KeywordCount } from 'src/app/repModel/vote.model';
import { Chamber } from 'src/app/repModel/chamber.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-keyword-counts',
  templateUrl: './keyword-counts.component.html',
  styleUrls: ['./keyword-counts.component.css']
})
export class KeywordCountsComponent {

  @Input('data') public _keywordCounts: KeywordCount[] = [];

  @Input() _chamber: Chamber;
  @Input() _repId: string;
  @Input() _repName: string;

  constructor(public _router : Router) {}


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

  detailedVote(keywordCount: KeywordCount) {

      console.log("detailedVote() called");
      this._router.navigate(['/vote',
        this._chamber.paramName,
        this._repId,
        'legislative-subject',
        keywordCount.topic]);
  }

}
