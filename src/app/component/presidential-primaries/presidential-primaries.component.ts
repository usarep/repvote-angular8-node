import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presidential-primaries',
  templateUrl: './presidential-primaries.component.html',
  styleUrls: ['./presidential-primaries.component.css']
})
export class PresidentialPrimariesComponent implements OnInit {

  // hardwiring these here. can use Rep -- a bit more work, but more robust.
  warrenId = '2-S366';
  gillibrandId = '2-S331';
  harrisId = '2-S387';

  // house
  gabbardId = '1-G000571';
  castroId = '1-C001091';
  swalwellId = '1-S001193';


  constructor() { }

  ngOnInit() {
  }

}
