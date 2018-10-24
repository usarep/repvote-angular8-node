import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-indiv-rep-landing',
  templateUrl: './indiv-rep-landing.component.html',
  styleUrls: ['./indiv-rep-landing.component.css']
})
export class IndivRepLandingComponent implements OnInit, OnDestroy {

  subscription;

  _chamber : Chamber;

  constructor(private _route: ActivatedRoute, private titleService: Title) {
  }

  ngOnInit() {
      this.subscription = this._route.params.subscribe(
          params => {
              // house or  senate
              const normalized = String(params['chamber']).toLowerCase().trim();
              this._chamber = SupportedChambers[normalized];

            console.log(this._chamber);

            this.titleService.setTitle("Voting record of members of congress : " + normalized);

          }
      )
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
