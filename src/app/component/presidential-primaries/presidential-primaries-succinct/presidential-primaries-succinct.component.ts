import { Component, OnInit } from '@angular/core';
import { PresidentialPrimariesV2Component } from '../presidential-primaries-v2/presidential-primaries-v2.component';
import { UrlService } from 'src/app/repService/url.service';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-presidential-primaries-succinct',
  templateUrl: './presidential-primaries-succinct.component.html',
  styleUrls: ['./presidential-primaries-succinct.component.css']
})
export class PresidentialPrimariesSuccinctComponent extends PresidentialPrimariesV2Component implements OnInit {

  constructor(public urlService: UrlService) {
    super(urlService);
   }

  ngOnInit() {
    this.houseMembers = [this.castro, this.delaney, this.gabbard];
    this.senators = [this.booker,
      this.gillibrand,
      this.harris,
      this.klobuchar,
      this.sanders,
      this.warren];
  }

}
