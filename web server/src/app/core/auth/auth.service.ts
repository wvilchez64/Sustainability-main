import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service'
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment'
const API = environment.apiServer

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private localSignInUrl = API+'/auth/local'
  private socialSignInurl = API+'/auth/socialSignIn'
  private requestReseturl = API+'/auth/requestReset'
  private newPasswordUrl = API+'/auth/newPassword'
  private validPasswordTokenUrl = API+'/auth/validPasswordToken/'
  constructor(private http: HttpClient,
              private userService: UserService) {}


  socialSignIn(socialUser){    
    return this.http.post(this.socialSignInurl, 
                          socialUser,
                          {observe: 'response'})
                          .pipe(tap(res => {
                            const jwToken = res.headers.get('x-access-token');
                            this.userService.setToken(jwToken)
                           })
                         )
                               
  } 

  localSignIn(email: string, password: string){
    return this.http.post(this.localSignInUrl, 
                          {email, password},
                          {observe: 'response'})
                          .pipe(tap(res => {
                           const jwToken = res.headers.get('x-access-token');
                           this.userService.setToken(jwToken)
                          })
                         )
  }

  requestReset(request) {
    return this.http.post(this.requestReseturl, request);
  }

  newPassword(body) {
    return this.http.post(this.newPasswordUrl, body);
  }

  ValidPasswordToken(jwToken) {
    return this.http.get<any>(this.validPasswordTokenUrl + jwToken);
  }
}