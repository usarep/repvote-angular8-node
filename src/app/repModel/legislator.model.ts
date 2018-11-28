// this is from the legislator data

export class Legislator {
  rowId?: number;

  // @JsonProperty
  id?: Id;

  // @JsonProperty
  name?: Name;

  // @JsonProperty("other_names")
  otherNames?: Name[];

  // @JsonProperty
  bio?: Bio;

  // @JsonProperty
  terms?: Term[];

  // @JsonProperty("leadership_roles")
  leadershipRoles?: LeadershipRole[];

  // @JsonProperty
  family?: Family[];  // not recorded in db

}

export class Id {

  /*
   * bioguide: B000944
thomas: '00136'
lis: S307
govtrack: 400050
opensecrets: N00003535
votesmart: 27018
fec:
- H2OH13033
- S6OH00163
cspan: 5051
wikipedia: Sherrod Brown
house_history: 9996
ballotpedia: Sherrod Brown
maplight: 168
icpsr: 29389
wikidata: Q381880
google_entity_id: kg:/m/034s80
   */



// 	@JsonProperty
   bioguide: string;

  // @JsonProperty("bioguide_previous")
  bioguidePrevious?: string[];

  // @JsonProperty
   thomas?: string;

  // @JsonProperty
  lis?: string;

  // @JsonProperty
   govtrack? : string;

  // @JsonProperty
   opensecrets? : string;

  // @JsonProperty
  votesmart?: string;

  // @JsonProperty
  fec?: string[];

  // @JsonProperty
  cspan? : string;

  // @JsonProperty
   wikipedia? : string;

  // @JsonProperty("house_history")
  houseHistory? : string;

  // @JsonProperty("house_history_alternate")
  houseHistoryAlternate? : string;

  // @JsonProperty
  ballotpedia?: string;

  // @JsonProperty
  maplight? : string;

  // @JsonProperty
  icpsr? : string;

  // @JsonProperty
  wikidata? : string;

  // @JsonProperty("google_entity_id")
  googleEntityId? : string;


}

export class Name {

  // @JsonProperty
  first?: string;

  // @JsonProperty
   last? : string;

  // @JsonProperty("official_full")
   officialFull? : string;

  // @JsonProperty
   middle? : string;

  // @JsonProperty("nickname")
   nickName? : string;

  // @JsonProperty
   suffix? : string;

  // @JsonProperty("other_names")
   otherNames? : string;

  // @JsonProperty
   end? : any;  // should be Timestamp
}

export class Bio {

  // @JsonProperty
   birthday? : string;

  // @JsonProperty
  gender?: string;

  // @JsonProperty
  religion?: string;
}

export class Term {
  /*
   * type: rep
start: '1993-01-05'
end: '1995-01-03'
state: OH
district: 13
party: Democrat
   */

  // @JsonProperty
 type? : string;

  // @JsonProperty
   start? : any; // Timestamp

  // @JsonProperty
  end? : any; // Timestamp

  // @JsonProperty
   state? : string;

  // @JsonProperty
   district?: number;

  // @JsonProperty
   party?: string;

  // @JsonProperty
   caucus? : string;

  /*
   *  url: https://www.brown.senate.gov
address: 713 Hart Senate Office Building Washington DC 20510
phone: 202-224-2315
fax: 202-228-6321
contact_form: http://www.brown.senate.gov/contact/
office: 713 Hart Senate Office Building
state_rank: senior
rss_url:
   */

  // @JsonProperty
   url? : string;

  // @JsonProperty
   address? : string;

  // @JsonProperty
   phone? : string;

  // @JsonProperty
   fax? : string;

  // @JsonProperty("contact_form")
   contactForm? : string;

  // @JsonProperty
   office? : string;

  // @JsonProperty("state_rank")
   stateRank? : string;

  // @JsonProperty("rss_url")
   rssUrl? : string;

  // @JsonProperty("class")
   legisClass? : string;

  // @JsonProperty("party_affiliations")
  partyAffiliations: PartyAffiliation[] ;
}


export class LeadershipRole {
  /*
   * leadership_roles:
- title: Minority Whip
chamber: senate
start: '2013-01-03'
end: '2015-01-03'
- title: Majority Whip
chamber: senate
start: '2015-01-03'
end: '2017-01-03'
- title: Majority Whip
chamber: senate
start: '2017-01-03'
   */

  // @JsonProperty
   title? : string;

  // @JsonProperty
   chamber? : string;

  // @JsonProperty
   start? : any; // Timestamp

  // @JsonProperty
   end? : any; // Timestamp
}

export class Family
{
  /*
   * family:
- name: Stewart Lee Udall
relation: son
- name: Morris K. Udall
relation: nephew
- name: Mark Udall
relation: cousin
- name: Gordon H. Smith
relation: cousin
   */

  // @JsonProperty
   name? : string;

  // @JsonProperty
   relation? : string;
}

export class PartyAffiliation {
  /*
   * party_affiliations:
- start: '2009-01-06'
  end: '2009-02-23'
  party: Independent
- start: '2009-02-23'
  end: '2011-01-03'
  party: Democrat
   */

  // @JsonProperty
   start? : any; // Timestamp

  // @JsonProperty
   end? : any; // Timestamp

  // @JsonProperty
   party?: string;
}
