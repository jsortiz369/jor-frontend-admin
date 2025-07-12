import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  readonly darkTheme = signal<boolean>(false);
  toggleDarkMode() {
    if (!this.darkTheme()) {
      this.darkTheme.set(true);
      document.documentElement.classList.add('app-dark');
    } else {
      this.darkTheme.set(false);
      document.documentElement.classList.remove('app-dark');
    }
  }
}
