import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import { IndivRepLandingComponent } from './component/reps/indiv-rep-landing/indiv-rep-landing.component';
import { IndivRepResultComponent } from './component/reps/indiv-rep-result/indiv-rep-result.component';
import { IndivRepKeywordResultComponent } from './component/reps/indiv-rep-keyword-result/indiv-rep-keyword-result.component';
import { CompareRepsLandingComponent } from './component/reps/compare-reps-landing/compare-reps-landing.component';
import { CompareRepsResultComponent } from './component/reps/compare-reps-result/compare-reps-result.component';
import { BillSummaryComponent } from './component/bill/bill-summary/bill-summary.component';
import { AmendmentSummaryComponent } from './component/bill/amendment-summary/amendment-summary.component';
import { NotFoundComponent } from './not-found.component';


// import { BillSummaryOldComponent } from './reps/bill-summary-old.component';

export const ngProjectRouting = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'vote/:chamber', component: IndivRepLandingComponent },
    { path: 'vote/:chamber/:rep', component: IndivRepResultComponent },
  { path: 'vote/:chamber/:rep/:topicType/:topic', component: IndivRepKeywordResultComponent },
  { path: 'vote/:chamber/:rep/:topicType/:topic/:voteType', component: IndivRepKeywordResultComponent },

    { path: 'compare/:chamber', component: CompareRepsLandingComponent },
    { path: 'compare/:chamber/:reps', component: CompareRepsResultComponent },
    // { path: 'billSummaryOld/:billId', component: BillSummaryOldComponent },
    { path: 'billSummary/:congress/:docType/:docNumber', component: BillSummaryComponent },
    { path: 'amendmentSummary/:congress/:docType/:docNumber', component: AmendmentSummaryComponent },

    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: 'notfound' },
]);
