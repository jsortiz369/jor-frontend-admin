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
    loadChildren: () => import('./roles/features/roles.routes'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
] as Routes;
