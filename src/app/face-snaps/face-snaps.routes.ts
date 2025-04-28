import { Routes } from '@angular/router';
import { FaceSnapListComponent } from './components/face-snap-list/face-snap-list.component';
import { SingleFaceSnapComponent } from './components/single-face-snap/single-face-snap.component';
import { NewFaceSnapComponent } from './components/new-face-snap/new-face-snap.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: 'create', component: NewFaceSnapComponent, canActivate: [AuthGuard]},
    { path: ':id', component: SingleFaceSnapComponent, canActivate: [AuthGuard]},
    { path: '', component: FaceSnapListComponent, canActivate: [AuthGuard]},
];
