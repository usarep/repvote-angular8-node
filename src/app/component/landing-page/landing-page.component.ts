import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/repModel/chamber.model';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  _chamber = House;

  constructor() { }

  ngOnInit() {
  }


}
