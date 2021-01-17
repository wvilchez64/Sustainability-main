import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { SignUpComponent } from './signup.component';

@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class SignUpModule { }