import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { tokenUserI } from './token-user-interface';
import jwt_decode from 'jwt-decode'

@Injectable({ providedIn: 'root'})
export class UserService { 

    private userSubject = new BehaviorSubject<tokenUserI>(null);
    private tokenUser: tokenUserI;
    
    constructor(private tokenService: TokenService) { 
        this.tokenService.hasToken() && 
                this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as tokenUserI;
        this.userSubject.next(user);
        this.tokenUser = user;
    }

    signOut() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getTokenUser() {
        return this.tokenUser;
    }

    getUserName() {
        return this.tokenUser.name
    }
}