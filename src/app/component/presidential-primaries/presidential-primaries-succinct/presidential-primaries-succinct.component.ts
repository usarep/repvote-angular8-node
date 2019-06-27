import { Component, OnInit } from '@angular/core';
import { PresidentialPrimariesV2Component } from '../presidential-primaries-v2/presidential-primaries-v2.component';
import { UrlService } from 'src/app/repService/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presidential-primaries-succinct',
  templateUrl: './presidential-primaries-succinct.component.html',
  styleUrls: ['./presidential-primaries-succinct.component.css']
})
export class PresidentialPrimariesSuccinctComponent extends PresidentialPrimariesV2Component implements OnInit {

  constructor(public urlService: UrlService, private _router: Router) {
    super(urlService);
   }

  ngOnInit() {
    // if this is not an iframe, redirect to /presidentialPrimaries
    if (window.self === window.top) {
      this._router.navigate(["/presidentialPrimaries"]);
    }
    else {
      // this is an iFrame
      this.houseMembers = [this.delaney,
      this.gabbard,
      this.moulton,
      this.orourke,
      this.ryanOH,
      this.swalwell];

      this.senators = [this.bennet,
      this.booker,
      this.gillibrand,
      this.harris,
      this.klobuchar,
      this.sanders,
      this.warren];
    }
  }

}
