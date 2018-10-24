import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from "@angular/common/http";

import { MatButtonModule, MatInputModule, MatCardModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule } from "@angular/material";


// ref: https://www.npmjs.com/package/ng5-breadcrumb
import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';

// other external modules
import { Ng2CompleterModule } from "ng2-completer";
import { ChartsModule } from 'ng4-charts/ng4-charts';

import { ShareButtonsOptions } from '@ngx-share/core';
import {ShareButtonsModule} from "@ngx-share/buttons";


import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorComponent } from './component/error/error.component';
import { ErrorInterceptor } from './error-interceptor';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';




import { AppComponent } from './app.component';

import { SpinnerComponent } from './shared/spinner.component';
import { ngProjectRouting } from './app.routing';
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

const customOptions: ShareButtonsOptions = {
  include: ['reddit', 'facebook', 'twitter', 'linkedin', 'whatsapp'],
  exclude: ['tumblr', 'stumble', 'vk'],
  // theme: 'modern-light',
  // gaTracking: true,
  // twitterAccount: 'twitterUsername'
};


@NgModule({
  declarations: [
    // Autosize,
    // AutosizeDirective, // npm install angular-autosize, as opposed to ng-autosize

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

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule, // (Optional) For linkedIn & Tumblr counts

    AngularMaterialModule,

    Ng5BreadcrumbModule.forRoot(),

    Ng2CompleterModule,
    ChartsModule,
    ShareButtonsModule.forRoot( { options: customOptions } ),



    ngProjectRouting
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }

  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
