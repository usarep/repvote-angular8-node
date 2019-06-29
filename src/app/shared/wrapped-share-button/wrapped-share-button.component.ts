import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-wrapped-share-button',
  templateUrl: './wrapped-share-button.component.html',
  styleUrls: ['./wrapped-share-button.component.css']
})
export class WrappedShareButtonComponent implements OnInit {

  // keep track of current url
  public currentUrl: string;
  constructor(private router: Router ) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
      }
    });
  }

}
