import { Component } from '@angular/core';
import { SidebarDirective } from '../../directive/sidebar/sidebar.directive';

@Component({
  selector: 'app-header',
  imports: [SidebarDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
