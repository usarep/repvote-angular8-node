import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chamber, SupportedChambers } from 'src/app/repModel/chamber.model';
import { Rep } from 'src/app/repModel/rep.model';
import { RepNamesService } from 'src/app/repService/rep-names.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

@Component({
  selector: 'app-rep-dir',
  templateUrl: './rep-dir.component.html',
  styleUrls: ['./rep-dir.component.css']
})
export class RepDirComponent implements OnInit, OnDestroy {

  public _chamber: Chamber;

  allInclusiveReps: Rep[] = [];

  private dataSubscription;
  private paramSubscription;

  // Senators or House Members
  public headingText = "";

  _repDataLoading = false;

  constructor(private _route: ActivatedRoute,
    private titleService: Title,
    private _repDataService: RepNamesService,
    private _router: Router) { }

  ngOnInit() {

    console.log("in ngOnInit of RepDirComponent ");
    this.paramSubscription = this._route.params.subscribe(
      params => {
        // house or  senate
        const normalized = String(params['chamber']).toLowerCase().trim();
        this._chamber = SupportedChambers[normalized];

        // memberNamePlural for house is CongressPersons. We prefer House Members
        if (normalized === 'house') {
          this.headingText = "House Members";
        } else if (normalized === "senate") {
          this.headingText = "Senators";
        }

        console.log(this._chamber);

        this.titleService.setTitle("Voting records of members of congress : " + normalized);

        this.dataSubscription = this._repDataService.getRepStatusListener()
          .subscribe(res => {
            console.log("rep-dir", res);

            if (this._chamber === res.chamber) {
              this.allInclusiveReps = res.reps;
              this._repDataLoading = false;
            }
            else {
              console.log("chambers dont match... skipping");
            }


          });

        console.log("RepDirComponent: calling fethReps");
        this._repDataService.fetchReps(this._chamber);
      }); // param subscription

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.dataSubscription);
    SubscriptionUtil.unsubscribe(this.paramSubscription);
  }

}
