import { Component } from '@angular/core';
import { SidebarDirective } from '../../directive/sidebar/sidebar.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, SidebarDirective],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
