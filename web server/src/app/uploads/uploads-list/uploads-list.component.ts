import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {SortColumnsHeaderDirective, SortEvent} from './sort-columns-header.directive';
import {ToastrService} from 'ngx-toastr';
import {saveAs} from "file-saver";

import {uploadsI} from './uploads.interface';
import {UploadsListService} from './uploads-list.service';
import {ConfirmModalService} from '../../shared/components/modal/confirm-modal/confirm-modal.service'

@Component(
    {selector: 'sus-uploads-list', 
     templateUrl: './uploads-list.component.html',
     styleUrls: ['./uploads-list.component.css'],
     providers: [UploadsListService],
    })

export class UploadsListComponent implements OnChanges {
  @Input() campaignId : number = 0;
  @Input() goalId : number = 0;
  @Input() count : number = 0

  files$: Observable<uploadsI[]>;
  total$: Observable<number>;
  disabledPage: boolean = true
  disabledSearch: boolean = true
  disabledSort: boolean = true
  disabledDelete: boolean = true
  disabledDownload: boolean = false

  files: uploadsI[]
  details: Array<any>
  fileId : number
  fileUserId : number
  newPercent : number
  total : number = 0 
  inactiveInd: boolean = false
  isDelete: boolean = false

  @ViewChildren(SortColumnsHeaderDirective) headers: QueryList<SortColumnsHeaderDirective>;
  @ViewChild('closebutton') closebutton;

  constructor(
    private toastr: ToastrService,
    public uploadsListService: UploadsListService,
    public confirmModalService: ConfirmModalService,
    ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.count) {
      this.loadFiles()
    }   
  }

  loadFiles() {
    this.uploadsListService.loadFiles(this.campaignId, this.goalId)
    this.files$ = this.uploadsListService.files$;
    this.total$ = this.uploadsListService.total$;
    this.total$.subscribe((res) => {
      this.disabledSearch = res == 0 ? true : false
      this.disabledSort = res <= 1 ? true : false
      this.disabledPage = res <= 4 ? true : false
      this.count = res
    })
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    if (this.disabledSort) {
      this.headers.forEach(header => header.direction = '');
    } else {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
      this.uploadsListService.sortColumn = column;
      this.uploadsListService.sortDirection = direction;
    }
  }

  changedAll(e) {
    this.disabledDelete = this.uploadsListService.changedAll(e.target.value == 'true' ? false : true)
  }

  changed(id) {
    this.files$.subscribe(res => this.files = res)
    this.disabledDelete = this.uploadsListService.changed(this.files[id].id)
  }

  downloadFile(id) {
    this.files$.subscribe(res => this.files = res)
    this.uploadsListService.downloadFile(this.files[id].id)
    .subscribe(
      data => {
        saveAs(data, this.files[id].fileName);
      },
      err => {
        this.toastr.error("Problem while downloading the file.");
        console.error(err);
      }
    );
  }

  async setInactiveFiles() {
    this.inactiveInd = false
    this.isDelete = true
    var state = {
                 disabledSearch : this.disabledSearch,
                 disabledSort : this.disabledSort,
                 disabledPage : this.disabledPage,
                 disabledDelete : this.disabledDelete,
                 disabledDownload : this.disabledDownload
                }
    this.disabledSearch = true
    this.disabledSort = true
    this.disabledPage = true
    this.disabledDelete = true
    this.disabledDownload = true

    this.confirmModalService.confirm('Do you want to confirm?', 'Yes', 'No')
    .then((confirmed) => {
      if (confirmed) {
        this.files$.subscribe(res => this.files = res)
        this.uploadsListService
        .setInactiveFiles()
        .subscribe(
          res =>  {
          this.loadFiles()
          this.disabledDelete = true
          this.toastr.success("File(s) deleted")
        },
        error => this.toastr.error("Internal Error")
        )
      } else {
        this.disabledDelete = false
        this.disabledSearch = state.disabledSearch
        this.disabledSort = state.disabledSort
        this.disabledPage = state.disabledPage
        this.disabledDelete = state.disabledDelete
        this.disabledDownload = state.disabledDownload
      }
    })
    .catch(() => {
      this.disabledSearch = state.disabledSearch
      this.disabledSort = state.disabledSort
      this.disabledPage = state.disabledPage
      this.disabledDelete = state.disabledDelete
      this.disabledDownload = state.disabledDownload
    })
    this.isDelete = false
  }
}