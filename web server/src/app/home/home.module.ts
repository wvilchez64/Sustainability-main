import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignInModule } from './signin/signin.module';
import { SignUpModule } from './signup/signup.module';
import { RequestResetModule } from './request-reset/request-reset.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    SignInModule,
    SignUpModule,
    RequestResetModule,
    ResetPasswordModule,
  ],
})

export class HomeModule { }

