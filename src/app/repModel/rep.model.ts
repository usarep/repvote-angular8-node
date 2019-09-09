import { Legislator } from "./legislator.model";
import { CdkStepLabel } from "@angular/cdk/stepper";
import { RepUtil } from '../repUtil/rep-util';

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

  photoAvailable?: boolean;

  // format: 1-A1234@first-middle-last
  seoNameId?: string;

  seoName?: string;

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

export class PresidentialCandidate {
  name: string;  // full name
  lastName: string;  // last name only
  value: string;  // 2-lis or 1-bioguide
  chamberId: number;
  bioguide: string; // for photo
  at?: string; // e.g., @elizabeth-warren

  constructor(o: {
    name: string,
    lastName: string,
    value: string,
    chamberId: number,
    bioguide: string,
    at?: string
  })
  {
    this.name = o.name;
    this.lastName = o.lastName;
    this.value = o.value;
    this.chamberId = o.chamberId;
    this.bioguide = o.bioguide;
    this.at = o.at;
  }


}
