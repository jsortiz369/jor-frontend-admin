import { Component } from '@angular/core';

import { LoaderComponent } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent],
  template: ` <app-loader /> `,
})
export class AppComponent {
  title = 'jor-frontend-admin';
}
