import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Gtag } from 'angular-gtag';
import { environment } from 'src/environments/environment.prod';
import { GlobalState } from './model/global-state';
import { BreadcrumbService } from 'ng5-breadcrumb';
import { SubscriptionUtil } from './shared/subscription-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';

  public testingBrowser = false;

  private queryParamSub;

  //
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private breadcrumbService: BreadcrumbService,
    public gtag: Gtag,
    public router: Router,
    public route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) {
    // gtag tracking: https://github.com/codediodeio/angular-gtag

    // breadcrumbs: https://github.com/akiocloud/ng5-breadcrumb
    // breadcrumbs is a TODO
    this.initBreadCrumbLabels();

  }

  ngAfterViewInit() {
    // console.log("in ngAfterViewInit");

    // try {
    //   let t = typeof window;
    //   if (typeof window != 'undefined') {
    //     console.log("window available, it is ", t);
    //   } else {
    //     console.log("window unavailable, t is ", t);
    //   }
    // } catch (err) {
    //   console.log("caught error for window", err);
    // }


    // if (isPlatformBrowser(this.platformId)) {
    //   this.testingBrowser = true;
    //   GlobalState.inIframe = this.computeInIframe();
    //   console.log("from browser, ngAfterViewInit: inIframe", GlobalState.inIframe);

    //   setTimeout(() => {
    //     console.log("toggling this.testingBrowser");
    //     this.testingBrowser = !this.testingBrowser;
    //   }, 5000);

    // // }



  }



  ngOnInit() {

    this.queryParamSub = this.route.queryParams.subscribe(params => {
      const contentOnly = params["co"];
      if (contentOnly) {
        GlobalState.inIframe = true;
        console.log("AppComponent: setting inIFrame to true based on queryString");
      }

    });

    if (isPlatformBrowser(this.platformId)) {
      this.testingBrowser = true;
      GlobalState.inIframe = this.computeInIframe();
      console.log("from browser ngOnInit: inIframe", GlobalState.inIframe);

    }

    this.titleService.setTitle("Voting record of members of congress");
    this.initKeywordsTag("roll-call, voting-record");

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.gtag.pageview({
            page_title: this.titleService.getTitle(),
            page_path: this.router.url,
            page_location: environment.server + this.router.url
          });

          // if this is the first url we are landing on, save it
          if (GlobalState.inIframe && !GlobalState.firstUrlInIframe) {
            GlobalState.firstUrlInIframe = this.router.url;
          }
        }
      });
    } // in browser

  }

  // ngOnDestroy() {
  //   SubscriptionUtil.unsubscribe(this.queryParamSub);
  // }

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

  initBreadCrumbLabels() {


    this.breadcrumbService.addCallbackForRouteRegex('/vote/house/[a-zA-Z0-9_\-]', this.getVoteHouseLeaf);
    this.breadcrumbService.addCallbackForRouteRegex('/vote/senate/[a-zA-Z0-9_\-]', this.getVoteSenateLeaf);

    this.breadcrumbService.addCallbackForRouteRegex('/compare/house/[a-zA-Z0-9_\-]', this.getCompareHouseLeaf);
    this.breadcrumbService.addCallbackForRouteRegex('/compare/senate/[a-zA-Z0-9_\-]', this.getCompareSenateLeaf);

    this.breadcrumbService.hideRouteRegex('/billSummary');
    this.breadcrumbService.hideRouteRegex('/billSummary/[a-zA-Z0-9_\-]');

    // amendmentSummary/110/SAmdt/5280
    this.breadcrumbService.hideRouteRegex('/amendmentSummary');
    this.breadcrumbService.hideRouteRegex('/amendmentSummary/[a-zA-Z0-9_\-]');


    this.breadcrumbService.hideRouteRegex('/vote/senate/[a-zA-Z0-9_\-]/policy-area');

    this.breadcrumbService.hideRoute('/compare');
    this.breadcrumbService.hideRoute('/vote');

    this.breadcrumbService.addCallbackForRoute('/presidentialPrimaries', this.getPresidentialPrimaries);

    this.breadcrumbService.hideRoute('/dir-compare');
    this.breadcrumbService.hideRoute('/dir');

    this.breadcrumbService.hideRouteRegex('/dir-compare/[a-zA-Z0-9_\-]');
    this.breadcrumbService.hideRouteRegex('/dir/[a-zA-Z0-9_\-]');


  }

  getVoteHouseLeaf(id: string): string {
    return 'member';
  }

  getVoteSenateLeaf(id: string): string {
    return 'senator';
  }

  getCompareHouseLeaf(id: string): string {
    return 'members';
  }

  getCompareSenateLeaf(id: string): string {
    return 'senators';
  }

  getPolicyArea(id: string): string {
    return "policy-area";
  }

  getPresidentialPrimaries(id: string): string {
    return "presidential-primaries";
  }

}
