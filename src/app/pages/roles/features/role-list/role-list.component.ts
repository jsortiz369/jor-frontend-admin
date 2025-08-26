import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TooltipModule } from 'primeng/tooltip';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { Role, RoleAllReponse, RoleDataTable, RoleParamDataTable } from '../../interfaces/role.interface';
import { RoleService } from '../../services';
import { AlertService } from '../../../../core/services/alert/alert.service';
import { LoaderService } from '../../../../core/services';

@Component({
  selector: 'app-role-list',
  imports: [
    CommonModule,
    PanelModule,
    TooltipModule,
    TagModule,
    SplitButtonModule,
    BreadcrumbModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    TextareaModule,
    FloatLabel,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit {
  readonly _alertService$ = inject(AlertService);
  readonly _loaderService$ = inject(LoaderService);
  readonly _roleService$ = inject(RoleService);

  protected readonly home = signal<MenuItem>({ icon: 'pi pi-home', label: 'Dashboard', routerLink: '/' });
  protected readonly itemsBreadCrumb = signal<MenuItem[]>([{ label: 'Roles' }]);
  protected readonly _roleAdmin = '95d6f671-39d0-47c4-a757-5303601ede53';

  readonly roleTable = signal<RoleDataTable>({ total: 0, rows: 10, loading: false, data: [], event: {} });
  readonly selectedRoles = signal<Role[]>([]);

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
      filters: event?.filters as Pick<RoleParamDataTable, 'filters'>['filters'],
    };

    this._roleService$.findAllByLazy(dataFilter).subscribe({
      next: ({ data, meta }: RoleAllReponse) => {
        const total = meta?.filter != undefined ? meta?.filter : meta.total;
        this.roleTable.update(() => ({ rows, total, loading: false, data: data, event }));
      },
      error: (error: HttpErrorResponse) => {
        //console.log(error);
        this.roleTable.update((last) => ({ ...last, loading: false }));
        //this._alertService$.clearToast('');
        //this._alertService$.toast({ severity: 'warn', summary: 'Warn', detail: `the list of roles could not be obtained` });
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    table.filterGlobal(value, 'contains');
  }

  onDeleteSelectedRoles() {
    console.log(this.selectedRoles());
  }
}
