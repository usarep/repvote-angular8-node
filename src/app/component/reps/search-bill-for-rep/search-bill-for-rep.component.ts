import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepVoteKeywordDetail } from 'src/app/repModel/vote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bill-for-rep',
  templateUrl: './search-bill-for-rep.component.html',
  styleUrls: ['./search-bill-for-rep.component.css']
})
export class SearchBillForRepComponent implements OnInit {

  @Input() _repId;
  @Input() _chamber;

  searchForm : FormGroup;
  constructor(private fb: FormBuilder, private _router: Router) {
    this.searchForm = fb.group({
      searchStr: ['', Validators.required],
      repId: [''],
      voteType: ['wasMember']  // all vote types. add if a radio group if necessary
    });
  }

  ngOnInit() {
    this.searchForm.get('repId').setValue(this._repId);
  }

  searchBillForRepVote() {

    console.log(this.searchForm.value);

    // search/:chamber/:rep/:searchStr
    this._router.navigate(['/search',
      this._chamber.paramName,
      this._repId,
      this.searchForm.value.searchStr
    ]);

  }

}
