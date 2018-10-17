import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-link-sr',
  templateUrl: './active-link-sr.component.html',
  styleUrls: ['./active-link-sr.component.css']
})
export class ActiveLinkSrComponent  {

  @Input() isActive;

  // add this to the active class
  activeString = "<span class='sr-only'>(current)</span>";

}
