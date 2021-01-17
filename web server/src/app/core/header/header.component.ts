import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { tokenUserI } from '../user/token-user-interface';

@Component({
    selector: 'sus-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent{ 
    user$: Observable<tokenUserI>;
    user: tokenUserI

    constructor(
        private userService: UserService, 
        private router:Router) 
        {    
            this.user$ = userService.getUser();
            //using *ngif='(user$ | async) as user, it is posible to get the user value without use subscribe'        
            this.user$.subscribe(user => this.user = user)
        }

    signOut() {
        this.userService.signOut();
        this.router.navigate(['']);
    }
}    