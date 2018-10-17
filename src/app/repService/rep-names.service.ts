import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Chamber } from '../repModel/chamber.model';
import { Observable, Subject } from 'rxjs';
import { Rep } from '../repModel/rep.model';
import { HttpClient } from '@angular/common/http';


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
              this._cachedRepNamesSearchData[chamber.id] = <Rep[]>res;
              this.repStatusListener.next({ chamber: chamber, reps: <Rep[]>res });
              return;
            });
    }

}

}
