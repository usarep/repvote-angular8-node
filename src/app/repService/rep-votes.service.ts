import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Chamber } from '../repModel/chamber.model';
import { Observable, Subject } from 'rxjs';
import { RepVoteSummary, RepVoteKeywordDetail } from '../repModel/vote.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepVotesService {
    // key == repNameId, value == summary data (absence, topics+vote-counts)
    _cachedRepVoteData = {};

    /*
        key == repNameId
        value == { keyword1: RepVoteKeywordDetail[] ,
                    keyword2: RepVoteKeywordDetail[],
                    ...
                }
    */
      _cachedRepVoteKeywordDetail = {};

    constructor(private http: HttpClient, public _urlService: UrlService)
    { }

  private repVoteSummaryStatus =
      new Subject<{ chamber: Chamber; repId: string; isBioGuide: boolean; repVoteSummary: RepVoteSummary }>();

  public getRepVoteSummaryStatusListener() {
    return this.repVoteSummaryStatus.asObservable();
  }

  public fetchRepVoteSummary(chamber: Chamber
                    , repId: string
                    , isBioGuide: boolean){

        /*
        if it's in cache, return an observable from cached data.
        else return an observable from fetched data
        */
        if (this._cachedRepVoteData[repId]) {
            // found in cache
          this.repVoteSummaryStatus.next({ chamber: chamber, repId: repId, isBioGuide: isBioGuide, repVoteSummary: this._cachedRepVoteData[repId] });
          return;
        }
        else {
          let repsVoteSummaryUrl;

          if (!isBioGuide) {
            repsVoteSummaryUrl = this._urlService.getRepVoteSummaryUrl(chamber.id, repId);
          }
          else {
            repsVoteSummaryUrl = this._urlService.getRepVoteSummaryUrlFromBioGuide(repId, chamber.desc);
          }
          return this.http.get(repsVoteSummaryUrl).subscribe(
            res => {
              console.log("getRepVoteSummary()", res);
              // cache it
              this._cachedRepVoteData[repId] = <RepVoteSummary>res;
              this.repVoteSummaryStatus.next({
                    chamber: chamber,
                    repId: repId,
                    isBioGuide: isBioGuide,
                    repVoteSummary: <RepVoteSummary>res
              });

              return;
            });
        } // else -- data not in cache

    }

//     getRepVoteSummaryOld(chamber: Chamber
//       , repId: string
//       , isBioGuide: boolean): Observable<RepVoteSummary> {


// if (this._cachedRepVoteData[repId]) {
// // found in cache
// return Observable.of(this._cachedRepVoteData[repId]);
// }
// else {
// let repsVoteSummaryUrl;

// if (!isBioGuide) {
//    repsVoteSummaryUrl = this._urlService.getRepVoteSummaryUrl(chamber.id, repId);
// }
// else {
//    repsVoteSummaryUrl = this._urlService.getRepVoteSummaryUrlFromBioGuide(repId, chamber.desc);
// }
// return this._ajaxService.get(repsVoteSummaryUrl).do(
//   res => {
//       console.log("getRepVoteSummary()");
//       console.log(res);
//       // cache it
//       this._cachedRepVoteData[repId] = <RepVoteSummary>res;
//       return res;
//   });
// }

// }

  private repKeywordDetailStatus =
    new Subject<{ chamber: Chamber; repId: string; topic: string; topicType: string; voteType: string; repVoteKeywordDetail: RepVoteKeywordDetail }>();

  public getRepKeywordDetailStatusListener() {
    return this.repKeywordDetailStatus.asObservable();

  }

  public fetchRepVoteKeywordDetail(chamber: Chamber, repId: string, topic: string, topicType: string, voteType: string)
  {

        /*
        if it's in cache, return an observable from cached data.
        else return an observable from fetched data
        */
        if (this._cachedRepVoteKeywordDetail[repId]
            && this._cachedRepVoteKeywordDetail[repId][topic]) {
            // found in cache

          this.repKeywordDetailStatus.next({
            chamber: chamber,
            repId: repId,
            topic: topic,
            topicType: topicType,
            voteType: voteType,
            repVoteKeywordDetail: this._cachedRepVoteKeywordDetail[repId][topic]
          });

          return ;
        }

        else {
          // not found in cache

            const repKeywordDetailUrl = this._urlService.getRepKeywordDetailUrl(chamber.id, repId, topic, topicType, voteType);
            return this.http.get(repKeywordDetailUrl).subscribe(
                res => {
                  console.log("getRepVoteKeywordDetail()", res);

                  // cache it
                  if (!this._cachedRepVoteData[repId]) {
                    this._cachedRepVoteData[repId] = {};
                  }

                  this._cachedRepVoteData[repId][topic] = <RepVoteKeywordDetail>res;

                  this.repKeywordDetailStatus.next({
                    chamber: chamber,
                    repId: repId,
                    topic: topic,
                    topicType: topicType,
                    voteType: voteType,
                    repVoteKeywordDetail: <RepVoteKeywordDetail>res
                  });

                  return;
                });
        }

    }

    // getRepVoteKeywordDetail(chamber: Chamber
    //   , repId: string
    //   , indexTerm: string): Observable<RepVoteKeywordDetail> {


    //   if (this._cachedRepVoteKeywordDetail[repId]
    //   && this._cachedRepVoteKeywordDetail[repId][indexTerm]) {
    //   // found in cache
    //   return Observable.of(this._cachedRepVoteData[repId][indexTerm]);
    //   }
    //   else {
    //   const repKeywordDetailUrl = this._urlService.getRepKeywordDetailUrl(chamber.id, repId, indexTerm);
    //   return this._ajaxService.get(repKeywordDetailUrl).do(
    //   res => {
    //   console.log("getRepVoteKeywordDetail()");
    //   console.log(res);
    //   // cache it
    //   if (!this._cachedRepVoteData[repId]) {
    //   this._cachedRepVoteData[repId] = {};
    //   }

    //   this._cachedRepVoteData[repId][indexTerm] = <RepVoteKeywordDetail>res;
    //   return res;
    //   });
    //   }

    // }

}
