import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-confirmdialog',
  imports: [CommonModule, ConfirmDialog, ButtonModule],
  templateUrl: './confirmdialog.component.html',
  styles: ``,
})
export class ConfirmdialogComponent {}
