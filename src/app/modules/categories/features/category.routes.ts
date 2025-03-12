import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./category-list/category-list.component').then(m => m.CategoryListComponent),
  },
] as Routes;