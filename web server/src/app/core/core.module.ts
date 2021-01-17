import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider,} from 'angularx-social-login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { MenuModel } from '../shared/components/menu/menu.module';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        SocialLoginModule,
        LoadingModule,
        MenuModel,
        ShowIfLoggedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '121488956864-0vm53nf7vqvh0m395h7t9jqb5tu0e1ce.apps.googleusercontent.com',
                            {
                            scope: 'profile email'
                            }
                        ),
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider(
                            '635551387152370',
                            {
                            scope: 'email, name',
                            return_scopes: true,
                            enable_profile_selector: true,
                            version: "v2.11" 
                            }
                        ),
                    },
                ],
            } as SocialAuthServiceConfig,
        }
    ]
})
export class CoreModule { }