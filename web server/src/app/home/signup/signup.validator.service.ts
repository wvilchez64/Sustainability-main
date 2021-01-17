import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpService } from './signup.service';
import { debounceTime, switchMap, map, first, tap } from 'rxjs/operators';

@Injectable()
export class SingUpValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkEmailTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(Email => 
                        this.signUpService.checkEmailTaken(Email)
                ))
                .pipe(map(isTaken => isTaken ? { emailTaken: true } : null))
                .pipe(tap(r => console.log(r)))
                .pipe(first());
        }
    }

    
    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(UserName => 
                        this.signUpService.checkUserNameTaken(UserName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(tap(r => console.log(r)))
                .pipe(first());
        }
    }
}