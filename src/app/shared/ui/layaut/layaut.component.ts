import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OverlayDirective } from '../../directive/overlay/overlay.directive';
import { HeaderComponent } from '../header/header.component';
import { SidebarWrapperDirective } from '../../directive/sidebar-wrapper/sidebar-wrapper.directive';



@Component({
  selector: 'app-layaut',
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent, OverlayDirective, SidebarWrapperDirective],
  templateUrl: './layaut.component.html',
})
export class LayautComponent {}
