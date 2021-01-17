import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    selector: 'sus-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent {
    isShown : boolean = false;

    constructor(
        private userService : UserService,
        private router: Router,
    ) {}

    toggle() {
        if (this.userService.isLogged()) {
            this.isShown = !this.isShown
        } else {
            this.router.navigate([''])
        }
    }
}