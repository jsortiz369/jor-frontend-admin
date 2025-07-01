import { Component } from '@angular/core';

import { LoaderComponent } from './shared/components';
import { ConfirmdialogComponent } from './shared/components/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, ConfirmdialogComponent],
  template: `
    <app-loader />
    <app-confirmdialog />
  `,
})
export class AppComponent {
  title = 'jor-frontend-admin';
}
