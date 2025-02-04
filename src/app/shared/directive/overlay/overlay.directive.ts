import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOverlay]'
})
export class OverlayDirective implements OnInit {
  private readonly element: Element = inject(ElementRef).nativeElement;
  private readonly renderer: Renderer2 = inject(Renderer2);

  constructor() { }

  ngOnInit() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();

      // hide sidebar
      this.renderer.addClass(document.querySelector('.main-container'), 'sidebar-closed');
      this.renderer.removeClass(document.querySelector('.main-container'), 'sbar-open');

      // hide overlay
      this.renderer.removeClass(document.querySelector('.overlay'), 'show');
      this.renderer.removeClass(document.querySelector('html, body'), 'sidebar-noneoverflow');
    })
  }

}
