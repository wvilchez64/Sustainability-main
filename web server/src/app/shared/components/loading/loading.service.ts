import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';

@Injectable ({providedIn: 'root'})

export class LoadingService {
    //loadingsSubject: Subject<LoadingType> = new Subject<LoadingType>()
    loadingsSubject = new Subject<LoadingType>()

    getLoading() {
        return this.loadingsSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED))
    }

    start() {
        this.loadingsSubject.next(LoadingType.LOADING)
    }

    stop() {
        this.loadingsSubject.next(LoadingType.STOPPED)
    }
}