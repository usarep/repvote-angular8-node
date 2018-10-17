import { ChamberBill } from './chamber.model';
import { SponsorRep } from './rep.model';

export class Diff {
    rollCallInfo: RollCallInfo;
    votes: VotesWrapped;
}

/*

"rowId": 9379,
"id": 0,
"congress": 114,
"session": 1,
"chamberId": 2,
"year": 2015,
"rollCallNum": 244,
"voteQuestion": "Coons Amdt. No. 2243",
"voteResult": "Amendment Agreed to",
"voteDesc": "To authorize the establishment of American Dream Accounts.",
"billId": 13863,
"actionDate": "July 16, 2015,  11:42 AM"

*/
export class RollCallInfo {
  rowId?: number;
  id?: number;  // if present, is the same as billId.
  congress?: number;
  sessionInt?: number;
  chamberId?: number;
  year?: number;
  rollCallNum?: number;
  voteQuestion?: string;
  voteResult?: string;
  voteDesc?: string;
  billId?: number;
  actionDate?: string;
  actionTime?: string;

  billDocType?: string;
  billDocNumber?: number;
  billTitle?: string;
  policyArea?: string;

  rollDocType?: string;
  rollDocNumber?: number;
  rollDocTitle?: string;
  rollDocNumberStr?: string; // for Treaty Doc 114-21, the number is 114-21, 114 being a potentially different congress than the current one

  // in cases where house amendment info is not available from bill-status, e.g., because of a bug in their xml, use this

  houseAmendNum?: number;
  houseAmendAuthor?: string;
  amdtId?: number; // bill_sub.id
  amdtDocType?: string;
  amdtDocNumber?: number;
  amdtChamberId?: number;
  amdtChain?: string; // amendment of an amendment of a bill
  amdtTitle?: string;
  amdtPurpose?: string;
  amdtDesc?: string;

}

export class VotesWrapped {
    voteMetaDataId: number;
    votes: string[];
}

export class DataModel {
    data: any[];
    label: string;
}

export class ChartModel {
    chartData: DataModel[];
    chartLabels: string[];
}


export class DiffData {
    repNames: string[];
    repIds: string[];

    diffs: Diff[];

    absence: ChartModel;
}

/*

this can be used for both legislative subjects as well as policy areas

{
"topic": "economics and public finance",
"yes": 1630,
"no": 1336,
"present": 3,
"absent": 125,
"voted": 0,  -- deprecated
"wasMember": 3094  -- number of votes for this topic
},

*/
export class KeywordCount {
    topic: string;
    wasMember: number;
    yes?: number;
    no?: number;
    present?: number;
    absent?: number;
}

export class RepVoteSummary {
  repName: string;
  repId: string;
  absence: ChartModel;
  keywordSummary: KeywordCount[];
  policyAreaSummary: KeywordCount[];
}

export class RepVoteKeywordDetail {
     repName: string;
     repId: string;
     topic: string;
     rollCallInfoVote: RollCallInfoVote[];
}

export class RollCallInfoVote {
    rollCallInfo: RollCallInfo;
    vote: string;
}

export class BillInfo {
  id: number;
  docType: string;
  docNumber: number;
  crsSummary: string;
  crsIndexTerms: string[];
  policyArea: string;
  description?: string;


    // deprecated
    docName: string;
    crsPrimaryIndexTerm: string;
    billUrl: string;
    indexTermsUrl: string;
    crsSummaryUrl: string;


}

export class VoteMetaId2BillId {
    vmId: number;
    billId: number;
}

export class BillLink {
    docType: string;
    docNumber: number;
    congress: number;
}

export class LatestAction {
    actionTime: string;
    text: string;
    actionDate: string;
}

export class AmendmentInfo {
    number: number;
    congress: number;
    purpose: string;
    amendmentType: string;
    description: string;
    chamber: ChamberBill;
    sponsors: SponsorRep[];  // sponsor.nameId Rep.id
    actions: Action[];
    actionDate: string;
    actionTime: string;
    committee: Committee;
  id: number;
  latestAction?: LatestAction;
  amendedBill?: AmendedBill;
  createDate?: string;
  submittedDate?: string;
  updateDate?: string;

}

export class AmendedBill {
  billType?: string;
  number?: number;
  billTitle?: string;
}



export class Link {
    url: string;
    name: string;
}

export class Action {
  text: string;
  links: Link[];
  actionDate?: string;
  actionTime?: string;
}

export class Committee {
    // TODO
}
