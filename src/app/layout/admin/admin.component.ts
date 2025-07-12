import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  imports: [RouterModule, TopbarComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styles: ``,
})
export class AdminComponent {}
