import {DecimalPipe} from '@angular/common';
import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {goalsI} from './goals.interface';
import {GoalsListService} from './goals-list.service';
import {SortColumnsHeaderDirective, SortEvent} from './sort-columns-header.directive';
import { ToastrService } from 'ngx-toastr';

@Component(
    {selector: 'sus-goals-list', 
     templateUrl: './goals-list.component.html',
     styleUrls: ['./goals-list.component.css'],
     providers: [GoalsListService, DecimalPipe]})

export class GoalsListComponent implements OnChanges {
  @Input() userId : number = 0;
  @Input() campaignId : number = 0

  modal: false
  goals$: Observable<goalsI[]>;
  total$: Observable<number>;
  disabledPage: boolean = true
  disabledSearch: boolean = true
  disabledSort: boolean = true

  goals: goalsI[]
  details: Array<any>
  goalId : number
  goalUserId : number
  newPercent : number
  total : number = 0 

  @ViewChildren(SortColumnsHeaderDirective) headers: QueryList<SortColumnsHeaderDirective>;
  @ViewChild('closebutton') closebutton;

  constructor(
    private toastr: ToastrService,
    public GoalsListService: GoalsListService,) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.userId || changes.campaignId) {
      this.GoalsListService.loadGoals(this.userId, this.campaignId)
      this.goals$ = this.GoalsListService.goals$;
      this.total$ = this.GoalsListService.total$;
      this.total$.subscribe((res) => {
        this.disabledSearch = res == 0 ? true : false
        this.disabledSort = res <= 1 ? true : false
        this.disabledPage = res <= 4 ? true : false    
      })
    }
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
      this.GoalsListService.sortColumn = column;
      this.GoalsListService.sortDirection = direction;
    }
  }

  getDetail(id){
   
    this.goals$.subscribe(res => this.goals = res)
    this.goalId = id
    this.goalUserId = this.goals[id].goalId
    
    this.details = [
          {description: "Code:", value : this.goals[id].code},
          {description: "Name:", value : this.goals[id].shortName},
          {description: "Notes:", value : this.goals[id].notes},
          {description: "% Completed:", value : this.goals[id].percentageOfCompletion},
      ]
  }

  saveGoalPercent() {
    this.goals$.subscribe(res => this.goals = res)
    if (this.newPercent < 0 || this.newPercent > 100) {
       this.toastr.error("Invalid percent value")
    } else {
       this.GoalsListService
       .setGoalsPercentBy(this.goalUserId, this.newPercent)
       .subscribe(
          res =>  {
            this.goals[this.goalId].percentageOfCompletion = this.newPercent
            this.closebutton.nativeElement.click();
            this.toastr.success("New % value updated")
          },
          error => this.toastr.error("Internal Error")
      )
    }
  }
}