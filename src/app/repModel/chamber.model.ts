export class Chamber {
  id?: number;  // 1 == house, 2 == senate
  paramName: string; // house, senate
  desc: string; // House of Represenatives, senate
  memberName: string; // CongressPerson, Senator
  memberNamePlural: string; // CongressPersons, Senators
  memberNamePlural2: string; // Members of the House, Senators

}

export const House = {
  id: 1,
  paramName: 'house',
  desc: 'House of Representatives',
  memberName: 'CongressPerson',
  memberNamePlural: 'CongressPersons',
  memberNamePlural2: 'House Members'
};

export const Senate = {
  id: 2,
  paramName: 'senate',
  desc: 'Senate',
  memberName: 'Senator',
  memberNamePlural: 'Senators',
  memberNamePlural2: 'Senators'
};

export const SupportedChambers = {
  house: House,
  senate: Senate
};

// this is how things are in an Amendment
export class ChamberBill {
  id: number;  // 1 or 2
  chamberName: string; // U.S. House of Representatives
  state?: string; // US
  shortName: string; // H or S
}
