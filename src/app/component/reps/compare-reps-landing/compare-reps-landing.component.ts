import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-reps-landing',
  templateUrl: './compare-reps-landing.component.html',
  styleUrls: ['./compare-reps-landing.component.css']
})
export class CompareRepsLandingComponent implements OnInit, OnDestroy {

  subscription;

  _chamber : Chamber;

  constructor(public _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this._route.params.subscribe(
      params => {
        // house or  senate
        const normalized = String(params['chamber']).toLowerCase().trim();
        this._chamber = SupportedChambers[normalized];

        console.log(this._chamber);

      }
    );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
