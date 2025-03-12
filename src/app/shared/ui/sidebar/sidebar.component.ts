import { Component, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarDirective } from '../../directive/sidebar/sidebar.directive';


@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, SidebarDirective],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
