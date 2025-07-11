import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth/auth.component').then((m) => m.AuthComponent),
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin/admin.component').then((m) => m.AdminComponent),
    loadChildren: () => import('./modules/modues.routes'),
  },
  {
    path: '**',
    redirectTo: 'admin/',
  },
];
