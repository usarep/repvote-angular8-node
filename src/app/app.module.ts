import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from "@angular/common/http";

// now part of AngularMaterialModule
// import { MatButtonModule, MatInputModule, MatCardModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule } from "@angular/material";


// ref: https://www.npmjs.com/package/ng5-breadcrumb
// undo comment
import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';
import { GtagModule } from 'angular-gtag';

// other external modules
import { Ng2CompleterModule } from "ng2-completer";
import { ChartsModule } from 'ng4-charts/ng4-charts';

// undo comments
// import { ShareButtonModule } from '@ngx-share/button';
// import {ShareButtonsModule} from "@ngx-share/buttons";


import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorComponent } from './component/error/error.component';
import { ErrorInterceptor } from './error-interceptor';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';




import { AppComponent } from './app.component';

import { SpinnerComponent } from './shared/spinner.component';
import { NotFoundComponent } from './not-found.component';
import { ActiveLinkSRComponent } from './active-link-sr.component';


import { environment } from '../environments/environment';

import { DateComponent } from './shared/date/date.component';

import { SafeHtmlPipe } from './util/safe-html.pipe';

import { LineChartComponent } from './component/line-chart/line-chart.component';
import { HomeComponent } from './component/home.component';
import { NavBarComponent } from './component/navBar/nav-bar.component';
import { BillSummaryComponent } from './component/bill/bill-summary/bill-summary.component';
import { AmendmentSummaryComponent } from './component/bill/amendment-summary/amendment-summary.component';
import { AbsenceBarChartComponent } from './component/reps/absence-bar-chart/absence-bar-chart.component';
import { AbsenceLineChartComponent } from './component/reps/absence-line-chart/absence-line-chart.component';
import { CompareRepsLandingComponent } from './component/reps/compare-reps-landing/compare-reps-landing.component';
import { CompareRepsResultComponent } from './component/reps/compare-reps-result/compare-reps-result.component';
import { CompareRepsSearchComponent } from './component/reps/compare-reps-search/compare-reps-search.component';
import { IndivRepKeywordResultComponent } from './component/reps/indiv-rep-keyword-result/indiv-rep-keyword-result.component';
import { IndivRepLandingComponent } from './component/reps/indiv-rep-landing/indiv-rep-landing.component';
import { IndivRepResultComponent } from './component/reps/indiv-rep-result/indiv-rep-result.component';
import { IndivRepSearchAutocompleteComponent } from './component/reps/indiv-rep-search-autocomplete/indiv-rep-search-autocomplete.component';
import { IndivRepSearchComponent } from './component/reps/indiv-rep-search/indiv-rep-search.component';
import { IssueLinkComponent } from './component/reps/issue-link/issue-link.component';
import { KeywordCountsComponent } from './component/reps/keyword-counts/keyword-counts.component';
import { RollCallBillInfoComponent } from './component/reps/roll-call-bill-info/roll-call-bill-info.component';
import { ActiveLinkSrComponent } from './component/navBar/active-link-sr/active-link-sr.component';
import { PolicyAreaCountsComponent } from './component/reps/policy-area-counts/policy-area-counts.component';
import { SearchBillForRepComponent } from './component/reps/search-bill-for-rep/search-bill-for-rep.component';
import { IndivRepVoteTableComponent } from './component/reps/indiv-rep-vote-table/indiv-rep-vote-table.component';
import { IndivRepSearchResultComponent } from './component/reps/indiv-rep-search-result/indiv-rep-search-result.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { RepSelectCardComponent } from './component/reps/rep-select-card/rep-select-card.component';
import { RepProfileCardComponent } from './component/reps/rep-profile-card/rep-profile-card.component';
import { RepPhotoNameComponent } from './component/reps/rep-info/rep-photo-name/rep-photo-name.component';
import { RepPhotoNameClearComponent } from './component/reps/rep-info/rep-photo-name-clear/rep-photo-name-clear.component';
import { TargetBlankDirective } from './shared/target-blank.directive';
import { PresidentialPrimariesComponent } from './component/presidential-primaries/presidential-primaries.component';
import { PresidentialPrimaryLandingPageComponent } from './component/presidential-primary-landing-page/presidential-primary-landing-page.component';
import { PresidentialPrimaryTableComponent } from './component/presidential-primaries/presidential-primary-table/presidential-primary-table.component';
import { PresidentialPrimariesV2Component } from './component/presidential-primaries/presidential-primaries-v2/presidential-primaries-v2.component';
import { TargetBlankConditionalDirective } from './shared/target-blank-conditional.directive';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { PresidentialPrimariesSuccinctComponent } from './component/presidential-primaries/presidential-primaries-succinct/presidential-primaries-succinct.component';


// undo comments
// import { WrappedShareButtonComponent } from './shared/wrapped-share-button/wrapped-share-button.component';

// undo comments
// const customOptions: ShareButtonsOptions = {
//   include: ['reddit', 'facebook', 'twitter', 'linkedin', 'whatsapp'],
//   exclude: ['tumblr', 'stumble', 'vk'],
//   theme: 'modern-light',
//   // gaTracking: true,
//   // twitterAccount: 'twitterUsername'
// };


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    NotFoundComponent,
    HomeComponent,
    NavBarComponent,
    ActiveLinkSRComponent,

    ErrorComponent,
    SafeHtmlPipe,
    DateComponent,

    BillSummaryComponent,

    AmendmentSummaryComponent,

    LineChartComponent,

    AbsenceBarChartComponent,

    AbsenceLineChartComponent,

    CompareRepsLandingComponent,

    CompareRepsResultComponent,

    CompareRepsSearchComponent,

    IndivRepKeywordResultComponent,

    IndivRepLandingComponent,

    IndivRepResultComponent,

    IndivRepSearchAutocompleteComponent,

    IndivRepSearchComponent,

    IssueLinkComponent,

    KeywordCountsComponent,

    RollCallBillInfoComponent,

    ActiveLinkSrComponent,

    PolicyAreaCountsComponent,

    SearchBillForRepComponent,

    IndivRepVoteTableComponent,

    IndivRepSearchResultComponent,

    LandingPageComponent,

    RepSelectCardComponent,

    RepProfileCardComponent,

    RepPhotoNameComponent,

    RepPhotoNameClearComponent,

    TargetBlankDirective,

    PresidentialPrimariesComponent,

    PresidentialPrimaryLandingPageComponent,

    PresidentialPrimaryTableComponent,

    PresidentialPrimariesV2Component,

    TargetBlankConditionalDirective,

    BackButtonComponent,

    PresidentialPrimariesSuccinctComponent,


    // undo comment
    // WrappedShareButtonComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule, // (Optional) For linkedIn & Tumblr counts

    AngularMaterialModule,

    // undo comments
    Ng5BreadcrumbModule.forRoot(),

    Ng2CompleterModule,
    ChartsModule,

    // undo comments
    // forRoot() removed in 7.1.0-beta.1
    // https://github.com/MurhafSousli/ngx-sharebuttons/blob/master/CHANGELOG.MD
    // was forRoot({ options: customOptions })
    // ShareButtonsModule.withConfig(customOptions),

    GtagModule.forRoot({ trackingId: 'UA-131004935-1', trackPageviews: false, debug: true }),

    AppRoutingModule
  ],
  providers: [
     // { provide: TitleMetaService, useValue: {} },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
