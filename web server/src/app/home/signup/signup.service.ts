import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { localUserInterface } from './local-user.interface';
import { environment } from '../../../environments/environment'
const API = environment.apiServer

@Injectable()
export class SignUpService {
  
  private checkEmailTakenUrl = API+'/user/email/'
  private checkUserNameTakenUrl = API+'/user/username/'
  private signUpUrl = API+'/user/signup'
  
  constructor(private http: HttpClient) {  }

  checkEmailTaken(email: string) {
      return this.http.get(this.checkEmailTakenUrl + email);
  }

  checkUserNameTaken(userName: string) {
    return this.http.get(this.checkUserNameTakenUrl + userName);
  }

  signUp(newUser: localUserInterface) {
      return this.http.post(this.signUpUrl, newUser);
  }
   
}