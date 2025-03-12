import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent),
  },
] as Routes;