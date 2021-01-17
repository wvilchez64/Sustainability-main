import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth/auth.service'
import { confirmPasswordValidator } from '../../shared/validators/confirm-password.validator'

@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    jwToken: string  
    isJwTokenInvalid: boolean = true
    
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute
        ) {}

    ngOnInit(): void {
        this.jwToken = this.activatedRoute.snapshot.params.jwToken
        this.authService
        .ValidPasswordToken(this.jwToken)
        .subscribe(
            data => {
                this.isJwTokenInvalid = false
            }
                ,
            err => {
                this.isJwTokenInvalid = true
                this.toastr.error(err.error.message)
                this.router.navigate(['/home/request-reset'])
            }
        );
        
        this.resetPasswordForm = this.formBuilder.group({
            password:   ['', 
                            [
                                Validators.required,
                                Validators.minLength(8),
                                Validators.maxLength(15),
                                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*')
                            ]
                        ],
            confirm:    ['', 
                            [
                                Validators.required
                            ],
                        ],                        
        }
        ,{
            validator: confirmPasswordValidator
        });
    }

    newPassword() {
        let request = this.resetPasswordForm.getRawValue();
        request["jwToken"] = this.jwToken;
        this.authService
        .newPassword(request)
        .subscribe(
            () => {this.toastr.success('Your password has been reset successfully')
                this.router.navigate([''])},
            err => {
            this.toastr.error(err.error.message)
            this.router.navigate(['/home/request-reset'])}
        );
    }
}    