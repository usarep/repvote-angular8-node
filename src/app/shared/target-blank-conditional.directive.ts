import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTargetBlankConditional]'
})
export class TargetBlankConditionalDirective implements OnInit {

  @Input() optionalBlank;  // optionalBlank

  /*
  Does NOT work.
  need the input variable's value in constructor for it to work.
  ngOnInit() seems to be too late.
  but Input value is not available in constructor.
  */
  constructor(private el: ElementRef, private renderer: Renderer) {

    console.log("constructor: optionalBlank", this.optionalBlank);
    if (this.optionalBlank) {
      this.renderer.setElementAttribute(this.el.nativeElement, 'target', '_new');
       // el.nativeElement.attr.target = '_blank';
    }

  }

  ngOnInit() {

    console.log("ngOnInit optionalBlank", this.optionalBlank);
    if (this.optionalBlank) {
      this.renderer.setElementAttribute(this.el.nativeElement, 'target', '_new');
       // el.nativeElement.attr.target = '_blank';
    }

  }

}
