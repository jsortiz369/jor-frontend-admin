import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarDirective } from '../../directive/sidebar/sidebar.directive';
import { OverlayDirective } from '../../directive/overlay/overlay.directive';
import { SidebarWrapperDirective } from '../../directive/sidebar-wrapper/sidebar-wrapper.directive';

interface Sidebar {
  name: string;
  icon?: string;
  url?: string;
  children?: Sidebar[]
}

interface SidebarItem {
  name: string;
  icon?: string;
  url?: string;
  active: boolean;
  children?: SidebarItem[]
}

@Component({
  selector: 'app-layaut',
  imports: [CommonModule, RouterModule, SidebarDirective, OverlayDirective, SidebarWrapperDirective],
  templateUrl: './layaut.component.html',
})
export class LayautComponent implements OnInit {
  private router = inject(Router);
  protected urls: string[] = []
  protected sidebarItems: SidebarItem[] = [];
  private sidebar: Sidebar[] = [
    {
      name: "Dashboard",
      icon: "",
      url: "dashboard"
    },
    {
      name: "Customers",
      icon: "",
      url: "customers"
    },
    {
      name: "User",
      icon: "",
      children: [
        {
          name: "User",
          url: "users"
        },
        {
          name: "Roles",
          url: "roles"
        }
      ]
    },
    {
      name: "Store",
      icon: "",
      children: [
        {
          name: "Categories",
          url: "categories"
        },
        {
          name: "Products",
          url: "products"
        },
        {
          name: "Attributes of Products",
          url: "products-attributes"
        },
        {
          name: "Discounts of Products",
          url: "products-discounts"
        },
        {
          name: "Inventories of Products",
          url: "products-inventories"
        },
        {
          name: "Suppliers of Products",
          url: "products-suppliers"
        }
      ]
    }
  ]

  ngOnInit(): void {
    const url = this.router.url;
    this.urls = url.split('/');
    this.initSidebar();
  }

  private initSidebar() {
    this.sidebar.forEach(item => {
      if(item.children) {
        this.itemSidebar(item);
        return
      }

      const { children, ...rest } = item;
      this.itemSidebarUnique(rest);
    })
  }

  private itemSidebarUnique(item: Omit<Sidebar, 'children'>) {
    this.sidebarItems.push({ ...item, active: item.url != undefined && this.urls.includes(item.url) });
  }

  private itemSidebar(item: Sidebar) {
    const { children, ...rest } = item;
    const active = children!.some(child => this.urls.includes(child.url!));
    const sidebar:SidebarItem = { ...rest, active, children: [] };

    sidebar.children = children!.map(child => {
      const { children, ...rest } = child;
      return { ...rest, active: this.urls.includes(child.url!) };
    });
    
    this.sidebarItems.push(sidebar);
    /* this.itemSidebarUnique(rest);
    if(children) {
      children.forEach(child => {
        this.itemSidebar(child);
      })
    } */
  }
}
