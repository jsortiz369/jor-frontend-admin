import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './shared/components';
import { ConfirmdialogComponent } from './shared/components/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, ToastModule, ConfirmdialogComponent, RouterModule],
  template: `
    <app-loader />
    <p-toast />
    <app-confirmdialog />
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'jor-frontend-admin';
}
