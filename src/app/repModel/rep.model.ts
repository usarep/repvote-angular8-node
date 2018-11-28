import { Legislator } from "./legislator.model";

export class Rep {
  label: string;
  value: string;
  id?: string;
  chamberId?: number; // 1 for House,  2 for Senate

  // 11/27/2018

  bioGuide?: string;
  legislator?: Legislator;

  // following values are probably computable client-side from legislator, but we are doing it on the serve
  isCurrent?: boolean;

  // state, district, and party for the rep's last term
  state?: string;
  district?: number;
  party?: string;
  partyFull?: string;
}

// this is how sponsors and cosponsor fields appear in Bill or Amendment
export class SponsorRep {
  firstName: string;
  lastName: string;
  fullName: string;
  state: string;
  district: number;
  party: string;
  nameId: string;
}
