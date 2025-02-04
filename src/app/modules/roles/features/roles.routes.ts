import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./role-list/role-list.component').then(m => m.RoleListComponent),
    },
] as Routes;