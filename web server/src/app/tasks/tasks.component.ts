import { Component, OnInit } from '@angular/core';
//import { ToastrService } from 'ngx-toastr';

import { eventI } from './event.interface'

@Component({
  selector: 'sus-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  //implements OnInit{
  events: eventI[] = [];
  onNewEvent(event: eventI) {
      this.events = this.events.concat(event);
  }
  // constructor(
  //   private toastr: ToastrService,
  // ) {}
  
  // ngOnInit(): void {
  //    this.toastr.success('Method not implemented.');
  // }
}