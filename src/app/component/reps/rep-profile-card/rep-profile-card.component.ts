import { Component, OnInit, Input } from '@angular/core';
import { Rep } from 'src/app/repModel/rep.model';
import { Term } from 'src/app/repModel/legislator.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rep-profile-card',
  templateUrl: './rep-profile-card.component.html',
  styleUrls: ['./rep-profile-card.component.css']
})
export class RepProfileCardComponent implements OnInit {

  @Input() rep: Rep;

  currentTerm: Term; // if member is current, the last entry of terms

  _countWikiEntry = 0;

  wikipediaLink: string;

  name: string; // rep's name

  constructor() { }

  ngOnInit() {

    // set current term
    if (this.rep && this.rep.isCurrent && this.rep.legislator && this.rep.legislator.terms) {
      const terms = this.rep.legislator.terms;

      if (terms.length > 0) {
        this.currentTerm = terms[terms.length - 1];
      }

    }

    // wikipedia link
    // pre compute this, else it will get called again and again
    if (this.rep && this.rep.legislator
      && this.rep.legislator.id && this.rep.legislator.id.wikipedia)
    {
      let str = this.rep.legislator.id.wikipedia;

      console.log("_countWikiEntry=", this._countWikiEntry);
      console.log("str before=", str);
      str = str.replace(/\s+/g, '_');
      console.log("str after=", str);
      this.wikipediaLink = "https://en.wikipedia.org/wiki/" + str;
    }

    this.name = this.computeName();

  }

  private computeName() : string {
    if (!this.rep) {
      return null;
    }

    // check rep.legislator.name fields
    if (this.rep.legislator && this.rep.legislator.name) {
      // officialFull
      if (this.rep.legislator.name.officialFull) {
        return this.rep.legislator.name.officialFull;
      }
      else if (this.rep.legislator.name.last && this.rep.legislator.name.first) {
        return this.rep.legislator.name.first + " " + this.rep.legislator.name.last;
      }

    }

    // default when all else fails
    return this.rep.label;

  }




}
