import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
    declarations: [
        ResetPasswordComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ]
})
export class ResetPasswordModule { }
