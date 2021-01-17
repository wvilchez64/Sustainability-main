import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadsListComponent } from './uploads-list.component';
import { SortColumnsHeaderDirective } from './sort-columns-header.directive';
import { ConfirmModalModule } from '../../shared/components/modal/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [
    UploadsListComponent,
    SortColumnsHeaderDirective
  ],
  imports: [ 
    CommonModule, 
    FormsModule,
    NgbModule,
    ConfirmModalModule
  ],
  exports: [
    UploadsListComponent,
  ],
})

export class UploadsListModule { }
