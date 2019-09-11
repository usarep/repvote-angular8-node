import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rep-directories',
  templateUrl: './rep-directories.component.html',
  styleUrls: ['./rep-directories.component.css']
})
export class RepDirectoriesComponent implements OnInit {

  constructor() { }

  // too many links causes tomcat to run out of memory.
  compareEnabled = false;

  ngOnInit() {
  }

}
