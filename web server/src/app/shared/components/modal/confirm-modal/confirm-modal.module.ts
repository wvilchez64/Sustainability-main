import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ConfirmModalService } from './confirm-modal.service';

@NgModule({
    declarations: [ConfirmModalComponent],
    imports: [CommonModule,
              NgbModalModule],
    exports: [ConfirmModalComponent],
    providers: [ConfirmModalService]
})
export class ConfirmModalModule { }