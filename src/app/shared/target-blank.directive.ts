import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTargetBlank]'
})
export class TargetBlankDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
      renderer.setAttribute(el.nativeElement, 'target', '_blank');
      // el.nativeElement.attr.target = '_blank';
  }
}
