import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';

import { GoalsComponent } from './goals.component';

const routes: Routes = [
    { 
        path: '',
        component: GoalsComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Goals'
        } 
    }, 
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoalsRoutingModule { }

