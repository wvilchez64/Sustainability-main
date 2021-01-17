import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';

import { UploadsComponent } from './uploads.component';

const routes: Routes = [
    { 
        path: '',
        component: UploadsComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Uploads'
        }                        
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UploadsRoutingModule { }

