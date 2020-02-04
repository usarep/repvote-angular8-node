import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/repService/url.service';
import { Rep, PresidentialCandidate } from 'src/app/repModel/rep.model';

@Component({
  selector: 'app-presidential-primaries-v2',
  templateUrl: './presidential-primaries-v2.component.html',
  styleUrls: ['./presidential-primaries-v2.component.css']
})
export class PresidentialPrimariesV2Component implements OnInit {

  // hardwiring these here. can use Rep -- a bit more work, but more robust.

  /*
  {
    name: string,
    lastName: string,
    value: string,
    chamberId: number,
    bioguide: string
  }
  */


  warren = new PresidentialCandidate({
    name: 'Elizabeth Warren',
    lastName: 'Warren',
    value: '2-S366@elizabeth-warren',
    chamberId : 2,
    bioguide: 'W000817',
    at: '@elizabeth-warren'
  });


  gillibrand = new PresidentialCandidate({
    name: 'Kirsten Gillibrand',
    lastName: 'Gillibrand',
    value: '2-S331@kirsten-e-gillibrand',
    chamberId : 2,
    bioguide: 'G000555',
    at: '@kirsten-e-gillibrand'
  });


  harris = new PresidentialCandidate({
    name: 'Kamala Harris',
    lastName: 'Harris',
    value: '2-S387@kamala-d-harris',
    chamberId : 2,
    bioguide: 'H001075',
    at: '@kamala-d-harris'
  });

  booker = new PresidentialCandidate({
    name: 'Cory Booker',
    lastName: 'Booker',
    value: '2-S370@cory-a-booker',
    chamberId : 2,
    bioguide: 'B001288',
    at: '@cory-a-booker'
  });


  klobuchar = new PresidentialCandidate({
    name: 'Amy Klobuchar',
    lastName: 'Klobuchar',
    value: '2-S311@amy-klobuchar',
    chamberId : 2,
    bioguide: 'K000367',
    at: '@amy-klobuchar'
  });

  sanders = new PresidentialCandidate({
    name: 'Bernie Sanders',
    lastName: 'Sanders',
    value: '2-S313@bernard-sanders',
    chamberId : 2,
    bioguide: 'S000033',
    at: '@bernard-sanders'
  });

  biden = new PresidentialCandidate({
    name: 'Joseph Biden',
    lastName: 'Biden',
    value: '2-S010@joseph-biden',
    chamberId : 2,
    bioguide: 'B000444',
    at: '@joseph-biden'
  });

  bennet = new PresidentialCandidate({
    name: 'Michael Bennet',
    lastName: 'Bennet',
    value: '2-S330@michael-f-bennet',
    chamberId : 2,
    bioguide: 'B001267',
    at: '@michael-f-bennet'
  });


  // this.gillibrand, dropped out Aug 28, 2019
  // harris, Dec 3, 2019
  // booker, Jan 13, 2020
  senators = [
    this.bennet,
    this.klobuchar,
    this.sanders,
    this.warren,
  ];


  delaney = new PresidentialCandidate({
    name: 'John Delaney',
    lastName: 'Delaney',
    value: '1-D000620@john-k-delaney',
    chamberId : 1,
    bioguide: 'D000620',
    at: '@john-k-delaney'
  });

  gabbard = new PresidentialCandidate({
    name: 'Tulsi Gabbard',
    lastName: 'Gabbard',
    value: '1-G000571@tulsi-gabbard',
    chamberId : 1,
    bioguide: 'G000571',
    at: '@tulsi-gabbard'
  });

  /*
  castro = new PresidentialCandidate({
    name: 'Joaquin Castro',
    lastName: 'Castro',
    value: '1-C001091',
    chamberId : 1,
    bioguide: 'C001091'
  });
  */

  // https://www.usarep.org/compare/house/1-R000577@tim-ryan,1-O000170@beto-o-rourke

 ryanOH = new PresidentialCandidate({
  name: 'Tim Ryan (OH)',
  lastName: 'Ryan (OH)',
  value: '1-R000577@tim-ryan',
  chamberId : 1,
  bioguide: 'R000577',
  at: '@tim-ryan'
});

  swalwell = new PresidentialCandidate({
    name: 'Eric Swalwell',
    lastName: 'Swalwell',
    value: '1-S001193',
    chamberId : 1,
    bioguide: 'S001193'
  });

  orourke = new PresidentialCandidate({
    name: 'Beto O\'Rourke',
    lastName: 'O\'Rourke',
    value: '1-O000170@beto-o-rourke',
    chamberId : 1,
    bioguide: 'O000170',
    at: '@beto-o-rourke'
  });

  moulton = new PresidentialCandidate({
    name: 'Seth Moulton',
    lastName: 'Moulton',
    value: '1-M001196',
    chamberId : 1,
    bioguide: 'M001196'
  });



  // Joaquin is Julian's brother!
  // moulton and swallwell, delaney have dropped out
  houseMembers = [ this.gabbard];


  constructor(public urlService: UrlService) { }

  ngOnInit() {
  }

  csv(id1, id2) {
    return id1 + "," + id2;
  }

  public getPhotoUrl(rep) {

    const repPhotoUrl = this.urlService.getRepPhotoUrl(rep.bioguide);
    return repPhotoUrl;

  }

}
