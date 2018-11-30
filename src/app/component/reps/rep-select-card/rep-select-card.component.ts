import { Component, OnInit, Input } from '@angular/core';
import { Rep } from 'src/app/repModel/rep.model';

@Component({
  selector: 'app-rep-select-card',
  templateUrl: './rep-select-card.component.html',
  styleUrls: ['./rep-select-card.component.css']
})
export class RepSelectCardComponent implements OnInit {

  @Input() rep: Rep;


  constructor() { }

  ngOnInit() {
  }

}
