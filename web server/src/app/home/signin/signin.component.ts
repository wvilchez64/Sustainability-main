import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth/auth.service'
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { socialUserI } from '../../core/user/social-user.interface'   

@Component({
    selector: 'sus-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SignInComponent implements OnInit {
    fromUrl: string
    signinForm: FormGroup;
    socialUser: socialUserI;  

    getEmail: string
    getRemember: boolean = false;
    
    constructor(
        private socialAuthService: SocialAuthService,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute
        ) {}


    ngOnInit(): void {
        this.activateRoute
            .queryParams
            .subscribe(params => this.fromUrl = params.fromUrl)

        this.rememberInit()

        this.signinForm = this.formBuilder.group({
            email:  [this.getEmail, 
                        [
                            Validators.required,
                            Validators.email,
                        ]
                    ], 
            password:   ['', 
                            [
                                Validators.required,
                            ]
                        ],
            remember:   [this.getRemember]
        });
    }

    rememberInit() {

        if (localStorage.getItem("remember") === null) {
            this.getRemember = false
        } else {
            this.getRemember = localStorage.getItem('remember') == 'true' ? true : false;
        }
        if (this.getRemember == true) {
            this.getEmail = JSON.parse(localStorage.getItem('email'))
        }
    }

    rememberChange(email) {
        if (this.getRemember == true) {
            localStorage.setItem('email', JSON.stringify(email));
            localStorage.setItem('remember', 'true');
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('remember');
        }
    }

    socialAuth(socialProvider : string) {
        let socialPlatformProvider;
        if(socialProvider == 'facebook'){
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }else if(socialProvider == 'google'){
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } 

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (socialUser) => {
              this.socialSignIn(socialUser)
            }
        ).catch(err => {
            console.log('error ', err);
        })
    }


    socialSignIn(socialUser: socialUserI) {    
        this.authService.socialSignIn(socialUser)
          .subscribe((res) => {    
            this.toastr.success('User authenticated')
            this.router.navigate(['/goals']);    
        })    
    }   

    localSignIn(): void {
        const email = this.signinForm.get('email').value;
        const password = this.signinForm.get('password').value;
        this.getRemember = this.signinForm.get('remember').value;
        this.authService.localSignIn(email, password)
        .subscribe(
            (res) => {
                this.fromUrl
                    ? this.router.navigateByUrl(this.fromUrl)
                    : this.router.navigate(['/goals'])

                this.rememberChange(email)
                this.toastr.success('User authenticated')
            },
            error => {
                this.toastr.error('User not authenticated')
            }
        )
    }

}




