import { Routes } from '@angular/router';

export default [
  {
    path: '',
    title: 'Roles-list',
    loadComponent: () => import('./role-list/role-list.component').then((c) => c.RoleListComponent),
  },
] as Routes;
