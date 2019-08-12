import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: "./nav-bar.component.html" ,
    styleUrls: ['./nav-bar.component.css']

})
export class NavBarComponent {

  @Input() activeClass: string;

  // tslint:disable-next-line: variable-name
  constructor(private _router: Router) { }


  isCurrentlyActive(path) {
    // params: (path, isExact)
    if (this._router.isActive(path, true)) {
      return true;
    }
    else {
      return false;
    }

  }

  stopPropagation($event) {
        // tslint:disable-next-line: deprecation
        event.stopPropagation();
  }



}
