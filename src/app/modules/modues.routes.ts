import { Routes } from '@angular/router';

export default [
  {
    path: 'dashboard',
    title: 'Admin - Dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'roles',
    title: 'Admin - Roles',
    loadComponent: () => import('./roles/roles.component').then((m) => m.RolesComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
] as Routes;
