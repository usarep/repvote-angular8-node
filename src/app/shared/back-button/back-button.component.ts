import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { SubscriptionUtil } from '../subscription-util';
import { GlobalState } from 'src/app/model/global-state';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit , OnDestroy{

  // if history was saved in a stack, this would be the length
  // of that stack
  showBackButton = false;

  routeSubscription;

  constructor(
    private location: Location,
    private router: Router)
  {

  }

  ngOnInit() {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        /*
        if the landing page url has been set
        and if that url is not the same as our url, we show the back button.
        */
        if (GlobalState.firstUrlInIframe &&
          GlobalState.firstUrlInIframe !== this.router.url) {
          this.showBackButton = true;
        }
        else {
          this.showBackButton = false;
        }

      });
  }

  goBack() {

    this.location.back();

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.routeSubscription);
  }

}
