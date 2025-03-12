import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./modules/auth/ui/auth/auth.component').then(m => m.AuthComponent),
        loadChildren: () => import('./modules/auth/features/auth.routes')
    },
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
                loadChildren: () => import('./modules/roles/features/role.routes')
            },
            {
                path: 'users',
                loadChildren: () => import('./modules/users/features/user.routes')
            },
            {
                path: 'categories',
                loadChildren: () => import('./modules/categories/features/category.routes')
            },
            {
                path: 'products',
                loadChildren: () => import('./modules/products/features/product.routes')
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
