import { Component, inject } from '@angular/core';

import { LoaderService } from '../../services';

@Component({
  selector: 'app-loader',
  imports: [],
  template: `
    @if(_loaderService$.visible){
    <div class="loader-overlay fixed" id="loader-overlay">
      <div class="loader-spinner"></div>
    </div>
    }
  `,
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  readonly _loaderService$ = inject(LoaderService);
}
