import { Directive, ElementRef, HostListener, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSidebarWrapper]'
})
export class SidebarWrapperDirective implements OnInit {
  private readonly renderer: Renderer2 = inject(Renderer2);

  constructor() {}

  ngOnInit(): void {
    this.sidebarCloser();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    const windowWidth = window.innerWidth;
    if ( windowWidth <= 991 ) return;

    if (document.querySelector('body')?.classList.contains('alt-menu')) {
      if (!document.querySelector('.main-container')?.classList.contains('sidebar-closed')) return;

      this.renderer.removeClass(document.querySelector('li.menu .submenu'), 'show');
      this.renderer.addClass(document.querySelector('li.menu.active .submenu'), 'recent-submenu');
      this.renderer.addClass(document.querySelector('li.menu.active')?.querySelector('.collapse.submenu.recent-submenu'), 'show');
      this.renderer.setAttribute(document.querySelector('.collapse.submenu.recent-submenu')?.parentNode?.querySelector('.dropdown-toggle'), 'aria-expanded', 'true');
      return;
    }

    if (!document.querySelector('.main-container')?.classList.contains('sidebar-closed')) return;
    this.renderer.removeClass(document.querySelector('li.menu .submenu'), 'show');
    if (!document.querySelector('li.menu.active .submenu')) return
    this.renderer.addClass(document.querySelector('li.menu.active .submenu'), 'recent-submenu');
    this.renderer.addClass(document.querySelector('li.menu.active')?.querySelector('.collapse.submenu.recent-submenu'), 'show');
    this.renderer.setAttribute(document.querySelector('.collapse.submenu.recent-submenu')?.parentNode?.querySelector('.dropdown-toggle'), 'aria-expanded', 'true');
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    const windowWidth = window.innerWidth;
    if ( windowWidth <= 991 ) return;

    if (document.querySelector('body')?.classList.contains('alt-menu')) {
      if (!document.querySelector('.main-container')?.classList.contains('sidebar-closed')) return;
      const getMenuList:NodeListOf<Element> = document.querySelectorAll('li.menu');

      getMenuList.forEach((element: Element) => {
        const submenuShowEle = element.querySelector('.collapse.submenu.show');
        if(submenuShowEle) this.renderer.removeClass(submenuShowEle, 'show');
        const submenuExpandedToggleEle = element.querySelector('.dropdown-toggle[aria-expanded="true"]');
        if (submenuExpandedToggleEle) this.renderer.setAttribute(submenuExpandedToggleEle, 'aria-expanded', 'false');
      });

      return
    }

    if (!document.querySelector('.main-container')?.classList.contains('sidebar-closed')) return;
    const getMenuList:NodeListOf<Element> = document.querySelectorAll('li.menu');
    getMenuList.forEach((element: Element) => {
      const submenuShowEle = element.querySelector('.collapse.submenu.show');
      if(submenuShowEle) this.renderer.removeClass(submenuShowEle, 'show');
      const submenuExpandedToggleEle = element.querySelector('.dropdown-toggle[aria-expanded="true"]');
      if(submenuExpandedToggleEle) this.renderer.setAttribute(submenuExpandedToggleEle, 'aria-expanded', 'false');
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 991 ) {
      if (!document.querySelector('.main-container')?.classList.contains('sbar-open')) return
    }

    this.sidebarCloser();
    if(document.querySelector('.overlay.show')) {
      if(document.querySelector('.main-container.sbar-open')) {
        document.querySelector('.main-container')?.classList.toggle("sidebar-closed");
        document.querySelector('.header.navbar')?.classList.toggle('expand-header');
        document.querySelector('.main-container')?.classList.toggle("sbar-open");
        document.querySelector('.overlay')?.classList.toggle('show');
        document.querySelector('html, body')?.classList.toggle('sidebar-noneoverflow');
      }
    }
  }

  private sidebarCloser() {
    if (window.innerWidth <= 991 ) {
      if (!document.querySelector('body')?.classList.contains('alt-menu')) {
        this.renderer.addClass(document.querySelector("#container"), "sidebar-closed");
        this.renderer.removeClass(document.querySelector(".overlay"), "show");
      } else {
        this.renderer.removeClass(document.querySelector(".navbar"), "expand-header");
        this.renderer.removeClass(document.querySelector(".overlay"), "show");
        this.renderer.removeClass(document.querySelector("#container"), "sbar-open");
        this.renderer.removeClass(document.querySelector('html, body'), "sidebar-noneoverflow");
      }
    } else if (window.innerWidth > 991 ) {
      if (!document.querySelector('body')?.classList.contains('alt-menu')) {
       this.renderer.removeClass(document.querySelector("#container"), "sidebar-closed");
       this.renderer.removeClass(document.querySelector(".navbar"), "expand-header");
       this.renderer.removeClass(document.querySelector(".overlay"), "show");
       this.renderer.removeClass(document.querySelector("#container"), "sbar-open");
       this.renderer.removeClass(document.querySelector("html, body"), "sidebar-noneoverflow");
      } else {
        this.renderer.addClass(document.querySelector('html, body'), "sidebar-noneoverflow");
        this.renderer.addClass(document.querySelector("#container"), "sidebar-closed");
        this.renderer.addClass(document.querySelector(".navbar"), "expand-header");
        this.renderer.addClass(document.querySelector(".overlay"), "show");
        this.renderer.addClass(document.querySelector("#container"), "sbar-open");
        this.renderer.removeClass(document.querySelector('.sidebar-wrapper [aria-expanded="true"]')?.parentNode?.querySelector('.collapse'), 'show');
      }
    }
  }
}
