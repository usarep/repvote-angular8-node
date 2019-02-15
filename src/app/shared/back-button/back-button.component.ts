import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  // if history was saved in a stack, this would be the length
  // of that stack
  count=0;

  constructor(
    private location: Location,
    private router: Router)
  {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.count++;
      });
  }

  goBack() {
    // decremenent count. but it will increase again on the NavigationEnd, so
    // decrease by 2
    this.count -= 2;

    // just making sure there is no bug
    if (this.count < 0) {
      this.count = 0;
    }
    this.location.back();

  }

}
