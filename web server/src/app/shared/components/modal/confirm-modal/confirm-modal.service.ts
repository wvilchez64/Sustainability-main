import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from './confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  
  constructor(protected modalService: NgbModal) {
  }

  confirm(
    message: string,
    btnOkText: string,
    btnCancelText: string,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmModalComponent, { size: dialogSize });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}