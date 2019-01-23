import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/repService/url.service';

@Component({
  selector: 'app-presidential-primaries',
  templateUrl: './presidential-primaries.component.html',
  styleUrls: ['./presidential-primaries.component.css']
})
export class PresidentialPrimariesComponent implements OnInit {

  // hardwiring these here. can use Rep -- a bit more work, but more robust.

  warren = { chamberNameId: '2-S366', bioguide: 'W000817' };
  gillibrand = { chamberNameId: '2-S331', bioguide: 'G000555' };
  harris = { chamberNameId: '2-S387', bioguide: 'H001075' };

  gabbard = { chamberNameId: '1-G000571', bioguide: 'G000571' };
  castro = { chamberNameId: '1-C001091', bioguide: 'C001091' };
  swalwell = { chamberNameId: '1-S001193', bioguide: 'S001193' };


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
