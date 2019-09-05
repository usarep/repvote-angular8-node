import { Component, OnInit } from '@angular/core';
import { PresidentialPrimariesV2Component } from '../presidential-primaries-v2/presidential-primaries-v2.component';
import { UrlService } from 'src/app/repService/url.service';
import { Router } from '@angular/router';
import { GlobalState } from 'src/app/model/global-state';

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
    // with angular universal, there is no window object on the server.
    // so need to fix this logic. for nwo, no redirection
    // if (window.self === window.top) {
    //   this._router.navigate(["/presidentialPrimaries"]);
    // }
    // else
    {

      // this is an unfortunate hack. we should really be looking for the co param
      // see AppComponent.ts
      if (!GlobalState.inIframe) {
        GlobalState.inIframe = true;
      }


      // this should be an iFrame
      // seth moulton and eric swallwell have dropped out
      this.houseMembers = [this.delaney,
      this.gabbard,
      this.orourke,
      this.ryanOH];

      // gillibrand, dropped out Aug 28, 2019
      this.senators = [this.bennet,
      this.booker,
      this.harris,
      this.klobuchar,
      this.sanders,
      this.warren];

    }
  }

}
