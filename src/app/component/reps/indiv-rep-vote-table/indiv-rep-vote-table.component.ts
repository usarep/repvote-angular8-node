import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indiv-rep-vote-table',
  templateUrl: './indiv-rep-vote-table.component.html',
  styleUrls: ['./indiv-rep-vote-table.component.css']
})
export class IndivRepVoteTableComponent implements OnInit {

  @Input() _repVoteKeywordDetail;

  constructor() { }

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


     return glyph;

   }


}
