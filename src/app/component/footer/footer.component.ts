import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  // when the about, privacy etc links are active, make this true
  aboutAvailable = false;
  ngOnInit() {
  }

}
