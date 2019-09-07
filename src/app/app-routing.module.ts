import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';

import { IndivRepLandingComponent } from './component/reps/indiv-rep-landing/indiv-rep-landing.component';
import { IndivRepResultComponent } from './component/reps/indiv-rep-result/indiv-rep-result.component';
import { IndivRepKeywordResultComponent } from './component/reps/indiv-rep-keyword-result/indiv-rep-keyword-result.component';
import { CompareRepsLandingComponent } from './component/reps/compare-reps-landing/compare-reps-landing.component';
import { CompareRepsResultComponent } from './component/reps/compare-reps-result/compare-reps-result.component';
import { BillSummaryComponent } from './component/bill/bill-summary/bill-summary.component';
import { AmendmentSummaryComponent } from './component/bill/amendment-summary/amendment-summary.component';
import { NotFoundComponent } from './not-found.component';
import { IndivRepSearchResultComponent } from './component/reps/indiv-rep-search-result/indiv-rep-search-result.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { PresidentialPrimaryLandingPageComponent } from './component/presidential-primary-landing-page/presidential-primary-landing-page.component';
import { PresidentialPrimariesV2Component } from './component/presidential-primaries/presidential-primaries-v2/presidential-primaries-v2.component';
import { PresidentialPrimariesSuccinctComponent } from './component/presidential-primaries/presidential-primaries-succinct/presidential-primaries-succinct.component';
import { RepDirectoriesComponent } from './component/seo/rep-directories/rep-directories.component';
import { RepDirComponent } from './component/seo/rep-dir/rep-dir.component';
import { CompareDirComponent } from './component/seo/compare-dir/compare-dir.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'vote/:chamber', component: IndivRepLandingComponent },
  { path: 'vote/:chamber/:rep', component: IndivRepResultComponent },
  { path: 'vote/:chamber/:rep/:topicType/:topic', component: IndivRepKeywordResultComponent },
  { path: 'vote/:chamber/:rep/:topicType/:topic/:voteType', component: IndivRepKeywordResultComponent },

  { path: 'search/:chamber/:rep/:searchStr', component: IndivRepSearchResultComponent },

  { path: 'compare/:chamber', component: CompareRepsLandingComponent },
  { path: 'compare/:chamber/:reps', component: CompareRepsResultComponent },
  // { path: 'billSummaryOld/:billId', component: BillSummaryOldComponent },
  { path: 'billSummary/:congress/:docType/:docNumber', component: BillSummaryComponent },
  { path: 'amendmentSummary/:congress/:docType/:docNumber', component: AmendmentSummaryComponent },

  { path: 'presidentialPrimaries', component: PresidentialPrimariesV2Component }, // PresidentialPrimaryLandingPageComponent
  { path: 'presidential-primaries-succinct', component: PresidentialPrimariesSuccinctComponent  }, // PresidentialPrimaryLandingPageComponent

  // seo, list of reps
  { path: 'dir/:chamber', component: RepDirComponent },

  // seo, dir of comparisons
  { path: 'dir-compare/:chamber', component: CompareDirComponent },

  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
