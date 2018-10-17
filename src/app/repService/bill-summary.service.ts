import { Injectable } from '@angular/core';

import { BillInfo, VoteMetaId2BillId, AmendmentInfo } from '../repModel/vote.model';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillSummaryService {

  public _cachedBillSummaryData = {};

  public _cachedAmdtSummaryData = {};

  // mapping between vote meta data's id and bill id
  public _cachedVmId2BillId = {};

  constructor(private http: HttpClient,
      private _urlService: UrlService)
  { }


  // getBillSummaryOrig(congress: number,
  //                 docType: string,
  //                 docNumber: number): Observable<BillInfo> {

  //     /*
  //     if it's in cache, return an observable from cached data.
  //     else return an observable from fetched data

  //     using csvRepIds means order of reps matter for the cache. use a different key if desired
  //     */
  //     const key = "" + congress + "_" + docType.toLowerCase().trim() + "_" + docNumber;
  //     if (this._cachedBillSummaryData[key]) {
  //         // found in cache
  //         return Observable.of(this._cachedBillSummaryData[key]);
  //     }
  //     else {

  //         const billSummaryUrl = this._urlService.getBillSummaryUrl(congress, docType, docNumber);

  //         // fetch and cache the result
  //         return this._ajaxService.get(billSummaryUrl).do(
  //             res => {
  //                 console.log("getBillSummary()");
  //                 console.log(res);
  //                 // cache it
  //                 this._cachedBillSummaryData[key] = <BillInfo>res;
  //                 return res;
  //             });
  //     }


  // }

  private billSummaryStatus = new Subject<{ congress: number, docType: string, docNumber: number, billData: BillInfo } > ();

  public getBillSummaryStatusListener() {
    return this.billSummaryStatus.asObservable();
  }


  public fetchBillSummary(congress: number,
    docType: string,
    docNumber: number) {

    /*
    if it's in cache, return an observable from cached data.
    else return an observable from fetched data

    using csvRepIds means order of reps matter for the cache. use a different key if desired
    */
    const key = "" + congress + "_" + docType.toLowerCase().trim() + "_" + docNumber;
    if (this._cachedBillSummaryData[key]) {
      // found in cache
      this.billSummaryStatus.next({ congress: congress, docType: docType, docNumber: docNumber, billData: this._cachedAmdtSummaryData[key] });
      return;
    }
    else
    {

      const billSummaryUrl = this._urlService.getBillSummaryUrl(congress, docType, docNumber);

      // fetch and cache the result
      return this.http.get(billSummaryUrl).subscribe(
      res => {
        console.log("getBillSummary()", res);
        // cache it
        this._cachedBillSummaryData[key] = <BillInfo> res;
        this.billSummaryStatus.next({ congress: congress, docType: docType, docNumber: docNumber, billData: <BillInfo> res });

        return res;
      });
    }


  }



  // // get the billId corresponding to vote meta id
  // getBillIdOrig(vmId: number): Observable<VoteMetaId2BillId> {

  //     /*
  //     if it's in cache, return an observable from cached data.
  //     else return an observable from fetched data

  //     using csvRepIds means order of reps matter for the cache. use a different key if desired
  //     */
  //     if (this._cachedVmId2BillId[vmId]) {
  //         // found in cache
  //         return Observable.of(this._cachedVmId2BillId[vmId]);
  //     }
  //     else {

  //         const vmId2BillIdUrl = this._urlService.getVmId2BillIdUrl(vmId);

  //         // fetch and cache the result
  //         return this._ajaxService.get(vmId2BillIdUrl).do(
  //             res => {
  //                 console.log("getBillId()");
  //                 console.log(res);
  //                 // cache it
  //                 this._cachedVmId2BillId[vmId] = <VoteMetaId2BillId>res;
  //                 return res;
  //             });
  //     }


  // }

  /* deprecated

  private billIdUpdateStatus = new Subject<{ vmId: number ; voteMetaId2BillId: VoteMetaId2BillId }> ();

  // get the billId corresponding to vote meta id
  fetchBillId(vmId: number) {

    if (this._cachedVmId2BillId[vmId]) {
      // found in cache
      this.billIdUpdateStatus.next({ vmId: vmId, voteMetaId2BillId: this._cachedVmId2BillId[vmId] });
    }
    else {

        const vmId2BillIdUrl = this._urlService.getVmId2BillIdUrl(vmId);

        // fetch and cache the result
        return this.http.get(vmId2BillIdUrl).subscribe(
            res => {
                console.log("getBillId()", res);
                // cache it
                this._cachedVmId2BillId[vmId] = <VoteMetaId2BillId>res;
                this.billIdUpdateStatus.next({ vmId: vmId, voteMetaId2BillId: this._cachedVmId2BillId[vmId] });
            });
    }


  }

  */


  //  getAmendmentSummaryOrig(congress: number,
  //                 docType: string,
  //                 docNumber: number): Observable<AmendmentInfo> {

  //     /*
  //     if it's in cache, return an observable from cached data.
  //     else return an observable from fetched data

  //     using csvRepIds means order of reps matter for the cache. use a different key if desired
  //     */
  //     const key = "" + congress + "_" + docType.toLowerCase().trim() + "_" + docNumber;
  //     if (this._cachedAmdtSummaryData[key]) {
  //         // found in cache
  //         return Observable.of(this._cachedAmdtSummaryData[key]);
  //     }
  //     else {

  //         const billSummaryUrl = this._urlService.getAmendmentSummaryUrl(congress, docType, docNumber);

  //         // fetch and cache the result
  //         return this._ajaxService.get(billSummaryUrl).do(
  //             res => {
  //                 console.log("getAmendmentSummary()");
  //                 console.log(res);
  //                 // cache it
  //                 this._cachedAmdtSummaryData[key] = <AmendmentInfo>res;
  //                 return res;
  //             });
  //     }


  //  }

  private amendmentSummaryStatus = new Subject<{ congress: number, docType: string, docNumber: number, amendmentData: AmendmentInfo }>();

  public getAmendmentSummaryStatusListener() {
    return this.amendmentSummaryStatus.asObservable();
  }


  public fetchAmendmentSummary(congress: number, docType: string, docNumber: number)
  {

    /*
    if it's in cache, return an observable from cached data.
    else return observable from fetched data

    using csvRepIds means order of reps matter for the cache. use a different key if desired
    */
    const key = "" + congress + "_" + docType.toLowerCase().trim() + "_" + docNumber;
    if (this._cachedAmdtSummaryData[key]) {
      // found in cache
      this.amendmentSummaryStatus.next({ congress: congress, docType: docType, docNumber: docNumber, amendmentData: this._cachedAmdtSummaryData[key] });
      return;
    }

    else {

      const billSummaryUrl = this._urlService.getAmendmentSummaryUrl(congress, docType, docNumber);

      // fetch and cache the result
      return this.http.get(billSummaryUrl).subscribe(
      res => {
        console.log("getAmendmentSummary()", res);
        // cache it
        this._cachedAmdtSummaryData[key] = <AmendmentInfo>res;

        this.amendmentSummaryStatus.next({ congress: congress, docType: docType, docNumber: docNumber, amendmentData: <AmendmentInfo>res });
        return ;
      });
      }


    }

}
