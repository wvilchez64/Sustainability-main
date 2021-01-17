import {Injectable, PipeTransform} from '@angular/core';
import {SortColumn, SortDirection} from './sort-columns-header.directive';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

import {goalsI} from './goals.interface';
import {goalsResultI} from './goals-result.inteface';
import {goalsStateI} from './goals-state.interface';
const API = environment.apiServer

@Injectable()
export class GoalsListService {

    private sourceGoals: goalsI[] = []
    private _state : goalsStateI 
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _goals$ = new BehaviorSubject<goalsI[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private set(patch: Partial<goalsStateI>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }
    
    private getGoalsByCampaignUrl = API + "/api/goalsByCampaign/"
    private setGoalsPercentByIdUrl = API + "/api/setGoalsPercentById"

    constructor(
      private pipe: DecimalPipe,
      private http: HttpClient) {
    }

    setGoalsPercentBy(id, percent) {
      let body = {
        params : {
         'id' : id,
         'percent' : percent
        }
      }
      return this.http.put<any>(this.setGoalsPercentByIdUrl, body);
    }
        
    get goals$() { return this._goals$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this.set({page}); }
    set pageSize(pageSize: number) { this.set({pageSize}); }
    set searchTerm(searchTerm: string) { this.set({searchTerm}); }
    set sortColumn(sortColumn: SortColumn) { this.set({sortColumn}); }
    set sortDirection(sortDirection: SortDirection) { this.set({sortDirection}); }

    loadGoals(userId, campaignId) {

      this.sourceGoals = []
      this._loading$.complete()
      this._search$.complete()
      this._goals$.complete()
      this._total$.complete()
      this.clearSearch()
      this._loading$ = new BehaviorSubject<boolean>(true);
      this._search$ = new Subject<void>();
      this._goals$ = new BehaviorSubject<goalsI[]>([]);
      this._total$ = new BehaviorSubject<number>(0);
      this.http.get<any>(this.getGoalsByCampaignUrl + userId + '/' + campaignId)
               .subscribe(res => {
                 this.sourceGoals = res, 
                 delay(200),
                 this._search$
                 .pipe(tap(() => this._loading$.next(true)),
                 debounceTime(200),
                 switchMap(() => this.search()),
                 delay(200),
                 tap(() => this._loading$.next(false))
                 ).subscribe(result => {
                   this._goals$.next(result.goals);
                   this._total$.next(result.total);
                 });
                 this._search$.next();
                })
    }

    private search(): Observable<goalsResultI> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      // 1. sort
      let goals = this.sort(this.sourceGoals, sortColumn, sortDirection);
      // 2. filter
      goals = goals.filter((goals) => this.matches(goals, searchTerm, this.pipe));
      const total = goals.length;
  
      // 3. paginate
      goals = goals.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({goals, total});
    }

    compare(v1: string | number, v2: string | number) {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
    }

    sort(goals: goalsI[], column: SortColumn, direction: string): goalsI[] {
      if (direction === '' || column === '') {
        return goals;
      } else {
        return [...goals].sort((a, b) => {
          const res = this.compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }

    matches(goals: goalsI, term: string, pipe: PipeTransform) {
      return goals.name.toLowerCase().includes(term.toLowerCase())
          || pipe.transform(goals.percentageOfCompletion).includes(term)
    }
    
    clearSearch() {
      this._state = {
        page: 1,
        pageSize: 6,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
      }
      this._search$.next();
    }
}