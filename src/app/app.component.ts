import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { Recaptchav3Service } from './service/recaptchav3.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Gtag } from 'angular-gtag';
import { environment } from 'src/environments/environment.prod';
import { GlobalState } from './model/global-state';



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
  <app-nav-bar *ngIf="!inIframe"></app-nav-bar>

  <div class="hidden-xs app-vert-space">
    &nbsp;
  </div>
  <div class="visible-xs app-vert-space">
    &nbsp;
  </div>

  <router-outlet></router-outlet>

  <share-buttons></share-buttons>
  ` ,
  styleUrls: ['./app.component.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'app';


  //
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private breadcrumbService: BreadcrumbService,
    public gtag: Gtag,
    public router: Router,
    public route: ActivatedRoute
  ) {
    // gtag tracking: https://github.com/codediodeio/angular-gtag

    // breadcrumbs: https://github.com/akiocloud/ng5-breadcrumb
    // breadcrumbs is a TODO
    // this.initBreadCrumbLabels();

  }


  ngOnInit() {

    GlobalState.inIframe = this.computeInIframe();
    console.log("inIframe", GlobalState.inIframe);
    this.titleService.setTitle("Voting record of members of congress");
    this.initKeywordsTag("roll-call, voting-record");


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.gtag.pageview({
          page_title: this.titleService.getTitle(),
          page_path: this.router.url,
          page_location: environment.server + this.router.url
        });
      }
    });


  }

  get inIframe() {
    return GlobalState.inIframe;
  }

  computeInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return false;
    }
  }

  /*
  if there is a name=keywords tag, update it. else, initialize it
  */
 initKeywordsTag(contentStr: string) {

    const existing = this.metaService.getTag('name=keywords');
    console.log("existing", existing);

    if (existing && existing.content) {
      // update
      this.metaService.updateTag({ name: 'keywords', content: contentStr });
    }
    else {
      // add
      this.metaService.addTag({ name: 'keywords', content: contentStr });
    }

 }

  /*

  this part works, but the actual breadcrumbs at more depth require some attention

  remove the app-vert-space stuff if breadcrumbs are enabled

  <div class="hidden-xs our-breadcrumb">
    <breadcrumb></breadcrumb>
  </div>

  <div class="visible-xs our-breadcrumb">
    <breadcrumb></breadcrumb>
  </div>

  */

  // initBreadCrumbLabels() {

  //   this.breadcrumbService.addCallbackForRouteRegex('/vote/house/[a-zA-Z0-9_\-]', this.getVoteHouseLeaf);
  //   this.breadcrumbService.addCallbackForRouteRegex('/vote/senate/[a-zA-Z0-9_\-]', this.getVoteSenateLeaf);

  //   this.breadcrumbService.addCallbackForRouteRegex('/compare/house/[a-zA-Z0-9_\-]', this.getCompareHouseLeaf);
  //   this.breadcrumbService.addCallbackForRouteRegex('/compare/senate/[a-zA-Z0-9_\-]', this.getCompareSenateLeaf);

  //   this.breadcrumbService.hideRouteRegex('/billSummary');
  //   this.breadcrumbService.hideRouteRegex('/billSummary/[a-zA-Z0-9_\-]');

  //   // amendmentSummary/110/SAmdt/5280
  //   this.breadcrumbService.hideRouteRegex('/amendmentSummary');
  //   this.breadcrumbService.hideRouteRegex('/amendmentSummary/[a-zA-Z0-9_\-]');


  //   this.breadcrumbService.hideRouteRegex('/vote/senate/[a-zA-Z0-9_\-]/policy-area');


  // }

  // getVoteHouseLeaf(id: string): string {
  //   return 'member';
  // }

  // getVoteSenateLeaf(id: string): string {
  //   return 'senator';
  // }

  // getCompareHouseLeaf(id: string): string {
  //   return 'members';
  // }

  // getCompareSenateLeaf(id: string): string {
  //   return 'senators';
  // }

  // getPolicyArea(id: string): string {
  //   return "policy-area";
  // }


}
