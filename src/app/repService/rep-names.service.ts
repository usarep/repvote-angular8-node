import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Chamber } from '../repModel/chamber.model';
import { Observable, Subject } from 'rxjs';
import { Rep } from '../repModel/rep.model';
import { HttpClient } from '@angular/common/http';
import { RepUtil } from '../repUtil/rep-util';


@Injectable({
  providedIn: 'root'
})
export class RepNamesService {
  public _cachedRepNamesSearchData = {};

  constructor (public http: HttpClient, public _urlService: UrlService)
  { }

  // getRepsOrig(chamber: Chamber): Observable<Rep[]> {

  //     /*
  //     if it's in cache, return an observable from cached data.
  //     else return an observable from fetched data
  //     */
  //     if (this._cachedRepNamesSearchData[chamber.id]) {
  //         // found in cache
  //         return Observable.of(this._cachedRepNamesSearchData[chamber.id]);
  //     }
  //     else {
  //         const repsUrl = this._urlService.getRepsUrl(chamber.id);
  //         return this._ajaxService.get(repsUrl).do(
  //             res => {
  //                 console.log("getReps()");
  //                 console.log(res);
  //                 // cache it
  //                 this._cachedRepNamesSearchData[chamber.id] = <Rep[]>res;
  //                 return res;
  //             });
  //     }

  // }

  repStatusListener = new Subject<{ chamber: Chamber; reps: Rep[] }>();

  public getRepStatusListener() {
    return this.repStatusListener.asObservable();
  }

  public fetchReps(chamber: Chamber): Observable<Rep[]> {

    /*
    if it's in cache, return an observable from cached data.
    else return an observable from fetched data
    */
    if (this._cachedRepNamesSearchData[chamber.id]) {
        // found in cache
      this.repStatusListener.next({ chamber: chamber, reps: this._cachedRepNamesSearchData[chamber.id] });
      return;
    }
    else {
        const repsUrl = this._urlService.getRepsUrl(chamber.id);
        this.http.get(repsUrl).subscribe(
            res => {
              console.log("getReps()", res);
              // cache it
              this._cachedRepNamesSearchData[chamber.id] = res as Rep[];

              // add mappings (bioGuide, Rep) and (lis, Rep)
              // lis will be there only for senators
              this.add2RepMaps(<Rep[]>res);

              // add seo nameId
              const reps: Rep[] = res as Rep[];
              reps.forEach(rep => {
                RepUtil.initSeo(rep);
              });

              this.repStatusListener.next({ chamber: chamber, reps: <Rep[]>res });
              return;
            });
    }

  }

  // key == bioGuide. value == Rep -  has data for both chambers
  _bioGuideRepMap = {};

  // key == lis. value == R. for senate
  _lisRepMap = {};

  private add2RepMaps(reps: Rep[])
  {
    if (!reps || reps.length === 0) {
      return;
    }

    reps.forEach(rep => {

      // _bioGuideRepMap
      if (rep.bioGuide) {
        this._bioGuideRepMap[rep.bioGuide] = rep;
      }

      // _lisRepMap
      if (rep.legislator && rep.legislator.id && rep.legislator.id.lis) {
        this._lisRepMap[rep.legislator.id.lis] = rep;
      }
    });
  }



}
