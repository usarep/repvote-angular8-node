import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Recaptchav3Service } from './service/recaptchav3.service';

// [exclude]="'tumblr,pinterest,stumbleUpOn,google'"

/*
[title]="'ComparaRep'"
        [description]="'Compare votes cast by different House and Senate members'"
        [tags]="'tag1,tag2'"
        [include]="'facebook,twitter,reddit,whatsapp,linkedin'"
        [showCount]="true"
*/

@Component({
  selector: 'app-root',
  template: `
  <app-nav-bar></app-nav-bar>
  <share-buttons></share-buttons>

  <router-outlet></router-outlet>
  ` ,
  styleUrls: ['./app.component.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor() {


  }


  ngOnInit() {
  }

  initBreadCrumbLabels() {

    /*
    this.breadcrumbService.addFriendlyNameForRoute('/newForm', 'New');

    this.breadcrumbService.addFriendlyNameForRoute('/newForm/intakeForm', 'Intake');
    this.breadcrumbService.addFriendlyNameForRoute('/newForm/altMediaRequest', 'Alt Media Request');


    this.breadcrumbService.addFriendlyNameForRoute('/submittedForm', 'Submitted');
    this.breadcrumbService.addFriendlyNameForRoute('/submittedForm/intakeForm', 'Intake');
    this.breadcrumbService.addFriendlyNameForRoute('/submittedForm/altMediaRequest', 'Alt Media Request');

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/intakeForm/[a-zA-Z0-9_\-]', this.getIntakeLeaf);

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/altMediaRequest/[a-zA-Z0-9_\-]', this.getAltReqLeaf);

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/applicationForServices/[a-zA-Z0-9_\-]', this.getAppServicesReqLeaf);

    // login?next=...  -- nothing
    this.breadcrumbService.hideRouteRegex('/login');

    // agreementView/intakeForm
    this.breadcrumbService.hideRouteRegex('/agreementView');
    this.breadcrumbService.hideRouteRegex('/agreementView/[a-zA-Z0-9_\-]');

    // /agreementCreateEdit/emergencyEvacInfo
    this.breadcrumbService.hideRouteRegex('/agreementCreateEdit');
    this.breadcrumbService.hideRouteRegex('/agreementCreateEdit/[a-zA-Z0-9_\-]');

    // feedback. if we don't want to show the last node in the tree.
    // however, this will remove the link to "all feedbacks" in the breadcrumb, which is not desirable
    // this.breadcrumbService.hideRouteRegex('/submittedForm/feedback/[a-zA-Z0-9_\-]');

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/feedback/[a-zA-Z0-9_\-]', this.getFeedback);

    // this.breadcrumbService.hideRoute('/newForm');
    // this.breadcrumbService.hideRoute('/submittedForm');

    */

  }


}
