import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { UrlService } from 'src/app/repService/url.service';
import { Rep } from 'src/app/repModel/rep.model';
import { RepUtil } from 'src/app/repUtil/rep-util';
import { BaseRepPhotoName } from '../rep-photo-name-base';

@Component({
  selector: 'app-rep-photo-name',
  templateUrl: './rep-photo-name.component.html',
  styleUrls: ['./rep-photo-name.component.css']
})
export class RepPhotoNameComponent extends BaseRepPhotoName implements OnInit, OnChanges {

  @Input() rep: Rep;

  // if delete option is true, an x will be placed on the image/card
  @Input() deleteOption: boolean;

  @Output('onDelete') delete = new EventEmitter();

  constructor(public urlService: UrlService) {
    super(urlService);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.repName = this.computeName(this.rep);
  }

  // note: the "relative" at end ensures the child element's X appears at the top right
  public getCssClass(party) {
    let result = "btn selected-rep ";

     // red for republican, blue for democrat, orange for everything else
    if (!party) {
      result += " btn-warning ";
    }
    else if (party.toUpperCase() === 'R') {
      result += " btn-danger ";
    }
    else if (party.toUpperCase() === 'D') {
      result += " btn-primary ";
    }
    else {
      result += " btn-warning ";
    }

    result += " relative ";

    return result;

  }

  public deleteClicked() {
    this.delete.emit({ delete: true });
  }


}
