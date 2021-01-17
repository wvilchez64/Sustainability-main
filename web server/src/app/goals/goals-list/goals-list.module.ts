import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoalsListComponent } from './goals-list.component';
import { SortColumnsHeaderDirective } from './sort-columns-header.directive';

@NgModule({
  declarations: [
    GoalsListComponent,
    SortColumnsHeaderDirective
  ],
  imports: [ 
    CommonModule, 
    FormsModule,
    NgbModule
  ],
  exports: [
    GoalsListComponent,
  ],
})

export class GoalsListModule { }
