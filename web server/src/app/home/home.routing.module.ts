import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../core/auth/login.guard';

import { HomeComponent } from './home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            { 
                path: '',
                component: 
                SignInComponent,
                data: {
                    title: 'signin'
                }    
            },                
            { 
                path: 'signup',
                component: SignUpComponent,
                data: {
                    title: 'signup'
                }    
            },  
            {
                path: 'request-reset',
                component: RequestResetComponent,
                data: {
                    title: 'reset'
                }    

            },
            {
                path: 'reset-password/:jwToken',
                component: ResetPasswordComponent,
                data: {
                    title: 'password'
                }    
            },          
        ]
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }

