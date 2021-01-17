import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UploadsComponent } from './uploads.component';
import { UploadsRoutingModule } from './uploads.routing.module';
import { UploadsListModule } from './uploads-list/uploads-list.module';

@NgModule({
  declarations: [
    UploadsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UploadsRoutingModule,
    UploadsListModule,
  ],
  exports: [
    UploadsComponent
  ],
})

export class UploapsModule { }

