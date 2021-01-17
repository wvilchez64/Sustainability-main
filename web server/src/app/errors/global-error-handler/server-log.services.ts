import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../environments/environment'
import { GlobalErrorComponent } from '../global-error/global-error.component';
import { ServerLogI } from './server.log';
const LOG = environment.logServer

@Injectable ({providedIn: 'root'})
export class ServerLogService {

    constructor(private http: HttpClient,
                protected modalService: NgbModal,
                private router: Router,
                private zone: NgZone) {}
    
    log(serverLog: ServerLogI) {
        return this.http.post(LOG + '/infra/log', serverLog)
    }

    navigate(url: string) {
        this.zone.run(() => this.router.navigate([url]));
    }
}