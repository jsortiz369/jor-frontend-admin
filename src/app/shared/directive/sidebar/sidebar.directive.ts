import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSidebar]'
})
export class SidebarDirective implements OnInit {
  private readonly element: Element = inject(ElementRef).nativeElement;

  constructor() { }

  ngOnInit() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelector('.main-container')?.classList.toggle('sidebar-closed');
      document.querySelector('.header.navbar')?.classList.toggle('expand-header');
      document.querySelector('.main-container')?.classList.toggle('sbar-open');
      document.querySelector('.overlay')?.classList.toggle('show');
      document.querySelector('html, body')?.classList.toggle('sidebar-noneoverflow');
    })
  }

}
