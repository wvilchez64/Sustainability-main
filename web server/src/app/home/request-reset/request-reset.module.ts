import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestResetComponent } from './request-reset.component';

@NgModule({
    declarations: [
        RequestResetComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ]
})
export class RequestResetModule { }
