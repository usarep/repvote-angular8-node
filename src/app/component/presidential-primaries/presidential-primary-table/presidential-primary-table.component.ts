import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PresidentialCandidate } from 'src/app/repModel/rep.model';
import { UrlService } from 'src/app/repService/url.service';

@Component({
  selector: 'app-presidential-primary-table',
  templateUrl: './presidential-primary-table.component.html',
  styleUrls: ['./presidential-primary-table.component.css']
})
export class PresidentialPrimaryTableComponent implements OnInit, OnDestroy {

  @Input() reps : PresidentialCandidate[];

  @Input() chamberName: string;  // house or senate

  @Input() newPage: boolean;
  constructor(public urlService: UrlService) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  csv(id1, id2) {
    return id1 + "," + id2;
  }

  public getPhotoUrl(rep) {

    const repPhotoUrl = this.urlService.getRepPhotoUrl(rep.bioguide);
    return repPhotoUrl;

  }

}
