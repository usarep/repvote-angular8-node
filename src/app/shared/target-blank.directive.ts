import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appTargetBlank]'
})
export class TargetBlankDirective {
  constructor(el: ElementRef, renderer: Renderer) {
      renderer.setElementAttribute(el.nativeElement, 'target', '_blank');
      // el.nativeElement.attr.target = '_blank';
  }
}
