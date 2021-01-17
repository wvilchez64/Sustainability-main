import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth/auth.service'

@Component({
  selector: 'sus-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
   ) { }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, 
                               [Validators.required, 
                                Validators.email], 
                               this.forbiddenEmails),
    });
  }


  requestReset() {
    const email = this.RequestResetForm.getRawValue() as string;

    this.authService.requestReset(email)
    .subscribe(
      data => {
        this.RequestResetForm.reset();
        this.toastr.success('Reset password link send to email sucessfully')
        this.router.navigate([''])
      },
      err => {
        this.toastr.error(err.error.message)
      }
    );
  }
}