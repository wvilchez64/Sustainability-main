import {Injectable} from '@angular/core';
import {SortColumn, SortDirection} from './sort-columns-header.directive';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment'
import {uploadsI} from './uploads.interface';
import {uploadsListResultI} from './upload-list-result.inteface';
import {uploadsListStateI} from './uploads-list_state.interface';
const API = environment.apiServer

@Injectable()

export class UploadsListService {

    private sourceFiles: uploadsI[] = []
    private _state : uploadsListStateI 
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _files$ = new BehaviorSubject<uploadsI[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private set(patch: Partial<uploadsListStateI>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }
    
    private getfilesByUserUrl = API + "/api/filesByUser/"
    private setInactiveFilesUrl = API + "/api/setInactiveFiles"
    private getDownloadFileUrl = API + "/api/downloadFile"

    constructor(
      private http: HttpClient) {}
      
    setInactiveFiles() {
      let body = {
        params : {
          'id' : this.sourceFiles
        }
      }
      return this.http.put<any>(this.setInactiveFilesUrl, body);
    }

    downloadFile(id) {
      var body = { fileId: id };
      return this.http.post(this.getDownloadFileUrl, body, 
        {
          responseType: 'blob'
        });
    }
    
    get files$() { return this._files$.asObservable(); }
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

    loadFiles(campaignId, goalId) {
      this.sourceFiles = []
      this._loading$.complete()
      this._search$.complete()
      this._files$.complete()
      this._total$.complete()
      this.clearSearch()
      this._loading$ = new BehaviorSubject<boolean>(true);
      this._search$ = new Subject<void>();
      this._files$ = new BehaviorSubject<uploadsI[]>([]);
      this._total$ = new BehaviorSubject<number>(0);

      this.http.get<any>(this.getfilesByUserUrl + campaignId + '/' + goalId)
        .subscribe(res => {
          this.sourceFiles = res, 
          delay(200),
          this._search$
          .pipe(tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this.search()),
          delay(200),
          tap(() => this._loading$.next(false))
          ).subscribe(result => {
            this._files$.next(result.files);
            this._total$.next(result.total);
          });
          this._search$.next();
        })         
    }

    changedAll(value) {
      this.sourceFiles.forEach(function(obj) {
        obj.inactiveInd = value
      });
      return !this.sourceFiles.some(x => x.inactiveInd === true)
    }

    changed(id) {
      this.sourceFiles.forEach(function(obj) {
        if (obj.id == id) {
          obj.inactiveInd = !obj.inactiveInd
        }
      });
      return !this.sourceFiles.some(x => x.inactiveInd === true)
    }

    private search(): Observable<uploadsListResultI> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
      // 1. sort
      let files = this.sort(this.sourceFiles, sortColumn, sortDirection);

      // 2. filter
      files = files.filter((files) => this.matches(files, searchTerm));
      const total = files.length;
  
      // 3. paginate
      files = files.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({files, total});
    }

    compare(v1: string | number, v2: string | number) {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
    }

    sort(files: uploadsI[], column: SortColumn, direction: string): uploadsI[] {
      if (direction === '' || column === '') {
        return files;
      } else {
        return [...files].sort((a, b) => {
          let res 
          if (column === 'inactiveInd') {
            res = this.compare(a[column].toString(), b[column].toString());
          } else {
            res = this.compare(a[column], b[column]);
          }
          return direction === 'asc' ? res : -res;
        });
      }
    }

    matches(files: uploadsI, term: string) {
      return files.fileName.toLowerCase().includes(term.toLowerCase())
          || files.description.toLowerCase().includes(term.toLowerCase())
          || files.dateCreated.toLowerCase().includes(term.toLowerCase())
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