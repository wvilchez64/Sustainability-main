import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { TasksRoutingModule } from './tasks.routing.module';
import { TasksComponent } from './tasks.component';
import { EventComponent } from './event/event.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

@NgModule({
  declarations: [
    TasksComponent,
    SchedulerComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TasksRoutingModule,
    SchedulerModule,
    DateInputsModule,
  ],
  exports: [
    TasksComponent
  ],

})
export class TasksModule {}
