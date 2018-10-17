import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Chamber } from '../repModel/chamber.model';
import { DiffData } from '../repModel/vote.model';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class DiffDataService {

  public _cachedDiffData = {};

  constructor(private http: HttpClient, private _urlService: UrlService) { }

  // getDiffDataOrig(chamber: Chamber, csvRepIds: string): Observable<DiffData> {


  //   if (this._cachedDiffData[csvRepIds]) {
  //       // found in cache
  //       return Observable.of(this._cachedDiffData[csvRepIds]);
  //   }
  //   else {

  //       const compareUrl = this._urlService.getCompareUrl(chamber.id, csvRepIds);

  //       // Later, if desired, cache the diff data
  //       return this._ajaxService.get(compareUrl).do(
  //           res => {
  //               console.log("getDiffData()");
  //               console.log(res);
  //               // cache it
  //               this._cachedDiffData[csvRepIds] = <DiffData>res;
  //               return res;
  //           });
  //   }
  // }

  diffDataStatusListener = new Subject<{ chamber: Chamber; csvRepIds: string; diffData: DiffData }>();

  public getDiffDataStatusListener() {
    return this.diffDataStatusListener.asObservable();
  }

  public fetchDiffData(chamber: Chamber, csvRepIds: string) {


    if (this._cachedDiffData[csvRepIds]) {
        // found in cache
      this.diffDataStatusListener.next({ chamber: chamber, csvRepIds: csvRepIds, diffData: this._cachedDiffData[csvRepIds] });
      return;
    }
    else {

        const compareUrl = this._urlService.getCompareUrl(chamber.id, csvRepIds);

        // Later, if desired, cache the diff data
        return this.http.get(compareUrl).subscribe(
            res => {
                console.log("getDiffData()", res);
                // cache it
              this._cachedDiffData[csvRepIds] = <DiffData>res;
              this.diffDataStatusListener.next({ chamber: chamber, csvRepIds: csvRepIds, diffData: <DiffData> res });
              return;
            });
    }
  }


}
