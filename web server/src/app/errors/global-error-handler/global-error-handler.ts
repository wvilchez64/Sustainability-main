import { ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import * as StackTrace from 'stacktrace-js'
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { UserService } from '../../core/user/user.service'
import { ServerLogService } from './server-log.services';
import { environment } from 'src/environments/environment';

@Injectable()

export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector) {}
    
    handleError(error: any): void {

        let stackAsString: string = error

        const location = this.injector.get(LocationStrategy)
        const userService = this.injector.get(UserService)
        const serverLogService = this.injector.get(ServerLogService)
        const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';

        let message = error.message 
            ? error.message 
            : error.toString()

        StackTrace
        .fromError(error)
        .then(stackFrames => {
            stackAsString = stackFrames
            .map(sf => sf.toString())
            .join('\n');
        });

        let userName = userService.isLogged() 
                     ? userService.getUserName() 
                     : ''

        serverLogService.log({ 
            message, 
            url, 
            userName, 
            stack: stackAsString}
            ).subscribe(
                () => console.log('Error logged on server'),
                err => {
                    console.log('Fail to send error log to server');
                }

                );
 
        //if (environment.production) serverLogService.navigate('/error');
                   
        serverLogService.navigate('/error')

    }
}