import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Rep } from 'src/app/repModel/rep.model';
import { BaseRepPhotoName } from '../rep-photo-name-base';
import { UrlService } from 'src/app/repService/url.service';

@Component({
  selector: 'app-rep-photo-name-clear',
  templateUrl: './rep-photo-name-clear.component.html',
  styleUrls: ['./rep-photo-name-clear.component.css']
})
export class RepPhotoNameClearComponent extends BaseRepPhotoName implements OnInit, OnChanges {

  @Input() rep: Rep;

  constructor(public urlService: UrlService) {
    super(urlService);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.repName = this.computeName(this.rep);
  }

}
