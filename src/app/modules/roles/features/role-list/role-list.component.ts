import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { LoaderService } from '../../../../shared/services';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-role-list',
  imports: [ToastModule, PanelModule, BreadcrumbModule, CardModule, ToolbarModule, ButtonModule],
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit {
  readonly _alertService$ = inject(AlertService);
  readonly _loaderService$ = inject(LoaderService);

  protected readonly home = signal<MenuItem>({ icon: 'pi pi-home', label: 'Dashboard', routerLink: '/' });
  protected readonly itemsBreadCrumb = signal<MenuItem[]>([{ label: 'Roles' }]);

  constructor() {}

  ngOnInit(): void {}
}
