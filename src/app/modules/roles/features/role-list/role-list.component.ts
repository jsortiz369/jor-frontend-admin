import { Component, inject, OnInit, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { LoaderService } from '../../../../shared/services';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { RoleAllReponse, RoleDataTable, RoleParamDataTable } from '../../interfaces/role.interface';
import { RoleService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-list',
  imports: [ToastModule, PanelModule, BreadcrumbModule, CardModule, ToolbarModule, ButtonModule, TableModule],
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit {
  readonly _alertService$ = inject(AlertService);
  readonly _loaderService$ = inject(LoaderService);
  readonly _roleService$ = inject(RoleService);

  protected readonly home = signal<MenuItem>({ icon: 'pi pi-home', label: 'Dashboard', routerLink: '/' });
  protected readonly itemsBreadCrumb = signal<MenuItem[]>([{ label: 'Roles' }]);

  readonly roleTable = signal<RoleDataTable>({ total: 0, rows: 10, loading: false, data: [], event: {} });

  constructor() {}

  ngOnInit(): void {}

  onLazyRoles(event: TableLazyLoadEvent) {
    this.roleTable.update((last) => ({ ...last, loading: true }));
    const rows = event?.rows ?? this.roleTable().rows;
    const dataFilter: RoleParamDataTable = {
      sort: event.sortField as Pick<RoleParamDataTable, 'sort'>['sort'],
      limit: rows,
      page: Math.ceil((event?.first ?? 0) / rows) + 1,
      sortOrder: event?.sortOrder == 1 ? 'ASC' : 'DESC',
      search: '', //event?.globalFilter == null ? '' : event?.globalFilter,
    };

    this._roleService$.findAllByLazy(dataFilter).subscribe({
      next: ({ data, meta }: RoleAllReponse) => {
        // const total = meta?.filter != undefined ? meta?.filter : meta.total;
        // const newData: RoleTableList[] = data.map((_) => ({ ..._, actions: this.menusActions(_) }));
        // this.roleTable.update(() => ({ rows, total, loading: false, data: newData, event }));
      },
      error: (error: HttpErrorResponse) => {
        this.roleTable.update((last) => ({ ...last, loading: false }));
        //this._alertService$.clearToast('');
        //this._alertService$.toast({ severity: 'warn', summary: 'Warn', detail: `the list of roles could not be obtained` });
      },
    });
  }
}
