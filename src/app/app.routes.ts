import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        canActivate: [],
        loadComponent: () => import('./shared/ui/layaut/layaut.component').then(m => m.LayautComponent),
        children: [
            {
                path: 'dashboard',
                //title: 'Dashboard',
                loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'roles',
                loadChildren: () => import('./modules/roles/features/roles.routes')
            },
            {
                path: 'users',
                loadChildren: () => import('./modules/users/features/user.routes')
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
];
