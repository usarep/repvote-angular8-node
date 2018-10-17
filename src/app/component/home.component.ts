import { Component } from '@angular/core';
import { House } from '../repModel/chamber.model';

@Component({
  template: ` <h1> Welcome </h1>
  <div>
      Please select an action
  </div>
  `
})
export class HomeComponent {
  _chamber = House;

  // <compare-reps [_chamber]="_chamber" > </compare-reps>


}
