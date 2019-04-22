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
    value: '2-S366',
    chamberId : 2,
    bioguide: 'W000817'
  });

  gillibrand = new PresidentialCandidate({
    name: 'Kirsten Gillibrand',
    lastName: 'Gillibrand',
    value: '2-S331',
    chamberId : 2,
    bioguide: 'G000555'
  });

  harris = new PresidentialCandidate({
    name: 'Kamala Harris',
    lastName: 'Harris',
    value: '2-S387',
    chamberId : 2,
    bioguide: 'H001075'
  });

  booker = new PresidentialCandidate({
    name: 'Cory Booker',
    lastName: 'Booker',
    value: '2-S370',
    chamberId : 2,
    bioguide: 'B001288'
  });

  klobuchar = new PresidentialCandidate({
    name: 'Amy Klobuchar',
    lastName: 'Klobuchar',
    value: '2-S311',
    chamberId : 2,
    bioguide: 'K000367'
  });

  sanders = new PresidentialCandidate({
    name: 'Bernie Sanders',
    lastName: 'Sanders',
    value: '2-S313',
    chamberId : 2,
    bioguide: 'S000033'
  });

  biden = new PresidentialCandidate({
    name: 'Joseph Biden',
    lastName: 'Biden',
    value: '2-S010',
    chamberId : 2,
    bioguide: 'B000444'
  });


  senators = [this.warren,
    this.gillibrand,
    this.harris,
    this.booker,
    this.klobuchar,
    this.sanders
  ];


  delaney = new PresidentialCandidate({
      name: 'John Delaney',
      lastName: 'Delaney',
      value: '1-D000620',
      chamberId : 1,
      bioguide: 'D000620'
  });

  gabbard = new PresidentialCandidate({
    name: 'Tulsi Gabbard',
    lastName: 'Gabbard',
    value: '1-G000571',
    chamberId : 1,
    bioguide: 'G000571'
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


 ryanOH = new PresidentialCandidate({
  name: 'Tim Ryan (OH)',
  lastName: 'Ryan (OH)',
  value: '1-R000577',
  chamberId : 1,
  bioguide: 'R000577'
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
    value: '1-O000170',
    chamberId : 1,
    bioguide: 'O000170'
  });

  moulton = new PresidentialCandidate({
    name: 'Seth Moulton',
    lastName: 'Moulton',
    value: '1-M001196',
    chamberId : 1,
    bioguide: 'M001196'
  });



  // Joaquin is Julian's brother!
  houseMembers = [this.delaney,  this.gabbard, this.moulton, this.orourke, this.ryanOH, this.swalwell];


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
