export class Rep {
  label: string;
  value: string;
  id?: string;
  chamberId?: number; // 1 for House,  2 for Senate
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
