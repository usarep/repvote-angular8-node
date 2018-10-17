import { Component, SimpleChanges, Input, OnChanges } from '@angular/core';
import { BillLink, RollCallInfo } from 'src/app/repModel/vote.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roll-call-bill-info',
  templateUrl: './roll-call-bill-info.component.html',
  styleUrls: ['./roll-call-bill-info.component.css']
})
export class RollCallBillInfoComponent implements OnChanges {

  @Input() rollCallInfo: RollCallInfo;

  constructor(private _router: Router) {

  }

  text1;
  text2;
  amdt: BillLink;
  issueChain: BillLink[];

  ngOnChanges(changes: SimpleChanges) {

     // console.log("RollCallBillInfoComponent.ngOnChanges()");

      this.computeBillInfo();

  }

  /*

  e.g.,
  On the Motion S.Amdt. 2908:
  Motion to Waive All Applicable Budgetary Discipline Re: Manchin Amdt. No. 2908;
  To protect Second Amendment rights, ensure that all individuals who should be
   prohibited from buying a firearm are listed in the National Instant Criminal
   Background Check System, and provide a responsible and consistent background
   check process.

  <vote_question_text>
    On the Motion (Motion to Waive All Applicable Budgetary Discipline
    Re: Manchin Amdt. No. 2908)
  </vote_question_text>
  <vote_document_text>
     To protect Second Amendment rights, ensure that all individuals who
     should be prohibited from buying a firearm are listed in the National
     Instant Criminal Background Check System, and provide a responsible
     and consistent background check process.
  </vote_document_text>
  <question>On the Motion</question>
  <vote_title>
    Motion to Waive All Applicable Budgetary Discipline Re: Manchin Amdt. No. 2908
  </vote_title>

  <amendment>
    <amendment_number>S.Amdt. 2908</amendment_number>
    <amendment_to_amendment_number>S.Amdt. 2874</amendment_to_amendment_number>
    <amendment_to_amendment_to_amendment_number/>
    <amendment_to_document_number>H.R. 3762</amendment_to_document_number>
    <amendment_to_document_short_title>
       Restoring Americans' Healthcare Freedom Reconciliation Act of 2015
     </amendment_to_document_short_title>
    <amendment_purpose>
      To protect Second Amendment rights, ensure that all individuals
      who should be prohibited from buying a firearm are listed in the
      National Instant Criminal Background Check System, and
      provide a responsible and consistent background check process.
    </amendment_purpose>
  </amendment>


  so, for senate roll calls, the alg could be:

   voteQuestion + amendmentNumber (if any)
   voteTitle
   voteQuestionText

  however, we do not separately save voteTitle. also, voteQuestionText is currently not saved
  in the database.

  turns out, voteQuestionText is simply voteQuestion (voteTitle)

  we do have vote_document_text  saved as voteDesc, and it's the same as amdtPurpose for amendments

  so the alg could be:
      voteQuestionText
      amendmentNumber (if any)
      voteDesc or amdtPurpose, whichever is non null.
      amdtChain

   add: amendment-chain below as "issue"
      SAMDT 2908 -> SAMDT 2874 -> HR 3762
      with links to each
      the link is within our system if it's a supported docType.
      for unsupported docType such as Treat Doc or PN, link to congress.gov

  chamber_id=1 / House

  see roll 150, 2017 as an example
  amdt_doc_type=HAMDT amdt_doc_number=67, amdt_chamber_id=1
  amdt_chain and amdt_title are null
  amdt_purpose: An amendment numbered 2 printed in House Report 115-27 to create a separate exception for plaintiffs seeking compensation resulting from the bad faith of an insurer.
  amdt_desc: Page 5, line 4, strike the close quotation mark and the period which follows.    Page 5, after line 4, insert the following:    "(5) This subsection shall not apply to a case in which the plaintiff seeks compensation resulting from the bad faith of an insurer.".

  house_amend_author: Cartwright of Pennsylvania Amendment No. 2
  vote_question: On Agreeing to the Amendment
  vote_desc is null

  roll_doc_number and bill_doc_number: 725
  roll_doc_type and bill_doc_type: HR
  bill_title: Innocent Party Protection Act

  the roll-call-summary page on the house.gov site uses house_amend_author for title/desc
  and vote_question

  no mention of HAMDT 67 or amdt_purpose or amdt_desc

  so for house:

  vote_question
  vote_desc if non null
  amdt_doc_type amdt_doc_number - with link. if non null
  house_amend_author if non null
  amdt_purpose if non null
  amdt_desc if non null

  bread-crumb:
      if amdt_chain, then use that.
      else amdt_doc_type, amdt_number -> doc_type, doc_number

  add: policy_area: Law
  bill_title: Innocent Party Protection Act



  */

  computeBillInfo() {
      // console.log("computeBillInfo() called");
      const r = this.rollCallInfo;
      // with the normalization, values of text1, text2, etc same for house and senate


          /*
              voteQuestionText == voteQuestion
              amendmentNumber (if any)
              voteDesc or amdtPurpose, whichever is non null.
              amdtChain
          */
          this.text1 = r.voteQuestion;

          // text2
          if (r.houseAmendAuthor) {
              this.text2 = r.houseAmendAuthor + " ; ";
          }
          else {
              this.text2 = "";
          }
          if (r.voteDesc) {
              this.text2 += r.voteDesc;
          }
          else if (r.amdtPurpose) {
              this.text2 += r.amdtPurpose;
          }


          if (r.amdtDesc) {
              if (this.text2) {
                  this.text2 += " ; " + r.amdtDesc;
              }
              else {
                  this.text2 = r.amdtDesc;
              }
          }

          // amendment
          if (r.amdtDocNumber && r.amdtDocType) {
              this.amdt = this.createIssue(r.congress, r.amdtDocNumber,r.amdtDocType);

          }

          // issueChain bread crumb
          this.issueChain = [];

          // if there is an amendment chain, use it
          if (r.amdtChain) {
              const separator = ";";
              const parts = r.amdtChain.split(separator);

              // each part is of the form SAmdt 1234
              const re = /(\w+)\s(\d+)/;
              parts.forEach((item, index) => {
                  const arr = item.trim().match(re);
                  if (arr.length === 2) {
                      const issue = this.createIssue(r.congress, arr[1], arr[0]);
                      this.issueChain.push(issue);
                  }
                  else if (arr.length === 3) {
                      const issue = this.createIssue(r.congress, arr[2], arr[1]);
                      this.issueChain.push(issue);
                  }
              });
              /*
              for (var item in parts) {
                  var arr = item.trim().match(re);
                  if (arr.length == 2) {
                      var issue = this.createIssue(r.congress, arr[0], arr[1]);
                      this.issueChain.push(issue);
                  }
              }
              */

          }

          // there is no amendment chain
          else if (r.rollDocNumber) {
              if (this.amdt) {
                  this.issueChain.push(this.amdt);
              }
              const mainIssue = this.createIssue(r.congress, r.rollDocNumber, r.rollDocType);
              this.issueChain.push(mainIssue);
          }



  }

  private createIssue (congress, docNumber, docType) : BillLink  {
      const b = new BillLink();
      b.congress = congress;
      b.docNumber = docNumber;
      b.docType = docType;

      return b;
  }

   billSummary() {
      console.log("billSummary() called");
      if (this.rollCallInfo) {
          let url = "";
          if (this.rollCallInfo.rollDocType
              && this.rollCallInfo.rollDocType.toLowerCase().trim().endsWith("amdt")) {
              url = '/amendmentSummary';
          }
          else {
              url = '/billSummary';
          }
          this._router.navigate([url,
              this.rollCallInfo.congress,
              this.rollCallInfo.rollDocType,
              this.rollCallInfo.rollDocNumber
          ]);
      }
  }

}
