import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Rep } from '../repModel/rep.model';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public _action = {
    getReps: '/getReps.htm', // params: chamber_id=1 or 2
    compare: '/compare.htm',
    repvoteSummary: '/repkeysum.htm',
    repKeywordDetail: '/repkeydet.htm',
    billSummary: '/billSummary.htm',
    amendmentSummary: '/amendmentSummary.htm',
    vmId2BillId: '/vmId2BillId.htm'

};

getRepsUrl(chamberId: number) {
  const url = environment.server + this._action.getReps + "?chamber_id=" + chamberId;

  return url;

}

getCompareUrl(chamberId: number, csvRepIds) {

  const url = environment.server + this._action.compare
        + "?chamber_id=" + chamberId
        + "&rep_name_id=" + csvRepIds;

  return url;
}

getCompareUrlOld(chamberId: number, reps: Rep[]) {

    const url = environment.server + this._action.compare
        + "?chamber_id=" + chamberId
        + "&rep_name_id=" + reps[0].value + "," + reps[1].value;

    return url;
}

getRepVoteSummaryUrl(chamberId: number, repId: string) {

    const url = environment.server + this._action.repvoteSummary
        + "?chamber_id=" + chamberId
        + "&rep_name_id=" + repId ;

    return url;
}

// when repId is bioGuide. chamberStr is optional. when present, value is senate or house
getRepVoteSummaryUrlFromBioGuide(bioGuide: string, chamberStr: string) {

  let url = environment.server + this._action.repvoteSummary
        + "?bio_guide=" + bioGuide;

    if (chamberStr) {
        url += "&chamber=" + chamberStr;
    }

    return url;
}

/*
 /repkeydet.htm?chamber_id=1&rep_name_id=1-E000215&index_term=education

 /repkeydet.htm?chamber_id=1&rep_name_id=1-E000215&policy_area=education

*/
getRepKeywordDetailUrl(chamberId: number, repId: string, topic: string, topicType: string, voteType: string) {

  let url = environment.server + this._action.repKeywordDetail
    + "?chamber_id=" + chamberId
    + "&rep_name_id=" + repId;

  if (topicType && topicType === 'legislative-subject') {
    url += "&index_term=" + encodeURIComponent(topic);
  }

  if (topicType && topicType === 'policy-area') {
    url += "&policy_area=" + encodeURIComponent(topic);
  }

  if (voteType) {
    url += "&vote_type=" + encodeURIComponent(voteType);
  }

  return url;
}

  getRepVoteSearchUrl(chamberId: number, repId: string, searchStr: string) {

    // action.repKeywordDetail is the same for keyword and searchStr
    const url = environment.server + this._action.repKeywordDetail
    + "?chamber_id=" + chamberId
      + "&rep_name_id=" + repId
      + "&search_str=" + encodeURIComponent(searchStr);

    return url;

}

 getBillSummaryUrl(congress: number, docType: string, docNumber: number) {

  const url = environment.server + this._action.billSummary
         + "?congress=" + congress
         + "&doc_type=" + docType
         + "&doc_number=" + docNumber;

    return url;
 }

getAmendmentSummaryUrl(congress: number, docType: string, docNumber: number) {

  const url = environment.server + this._action.amendmentSummary
         + "?congress=" + congress
         + "&doc_type=" + docType
         + "&doc_number=" + docNumber;

    return url;
 }

getBillSummaryUrlOld(billId: number) {

  const url = environment.server + this._action.billSummary
         + "?bill_id=" + billId;

  return url;
 }

 getVmId2BillIdUrl(vmId: number) {
  const url = environment.server + this._action.vmId2BillId
         + "?vm_id=" + vmId;

  return url;
 }

  getRepPhotoUrl(bioGuide: string) {
    const url = environment.imgServer + "/photo/" + bioGuide + ".jpg";
    return url;
  }

}
