import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpService } from './signup.service';
import { localUserInterface } from './local-user.interface';
import { confirmPasswordValidator } from '../../shared/validators/confirm-password.validator'
import { SingUpValidatorService } from './signup.validator.service'
import { excludeUserNameValidator } from './exclude-username.validator'
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { userNamePasswordValidator } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [ SignUpService, SingUpValidatorService ]
})
export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private signUpService: SignUpService,
        private singUpValidatorService : SingUpValidatorService,
        private formBuilder: FormBuilder,
        ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            fullName:   ['', 
                            [
                                Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(40),
                            ]
                        ], 
            userName:   ['', 
                            [
                                Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(20),
                                lowerCaseValidator,
                                excludeUserNameValidator,
                                
                            ],
                            this.singUpValidatorService.checkUserNameTaken()
                    ], 
            email:  ['', 
                        [
                            Validators.required,
                            Validators.minLength(7),
                            Validators.maxLength(60),
                            Validators.email,
                        ],
                        this.singUpValidatorService.checkEmailTaken()
                    ], 
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

        }, {
            validators: [
                         userNamePasswordValidator,
                         confirmPasswordValidator
                        ]
        });
    }

    signUp() {
        const newUser = this.signupForm.getRawValue() as localUserInterface;
        this.signUpService
            .signUp(newUser)
            .subscribe(
                () => {this.toastr.success('User registered successfully')
                       this.router.navigate([''])},
                err => this.toastr.error('Internal error')
            );
    }
}    