import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/one', pathMatch: 'full' },
    { path: 'one', loadComponent: () => import('./component/one/one').then((c) => c.One) },
    { path: 'two', loadComponent: () => import('./component/two/two').then((c) => c.Two) },
    { path: 'three', loadComponent: () => import('./component/three/three').then((c) => c.Three) },
    { path: 'four', loadComponent: () => import('./component/four/four').then((c) => c.Four) },
    { path: 'sign', loadComponent: () => import('./component/sign/sign').then((c) => c.Sign) },
];
