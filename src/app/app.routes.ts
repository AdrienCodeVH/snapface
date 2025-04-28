import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { 
        path: 'facesnaps',
        loadChildren: () => import('./face-snaps/face-snaps.routes').then(m => m.routes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
];

