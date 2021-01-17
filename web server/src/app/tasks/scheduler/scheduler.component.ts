import { Component, OnInit, Input } from '@angular/core';
import { eventI } from '../event.interface'

@Component({
    selector: 'sus-scheduler',
    templateUrl: './scheduler.component.html',
})
export class SchedulerComponent implements OnInit {
    constructor() { }
    @Input() events: eventI[];
    startTime = '7:00';
    selectedDate = new Date();
    ngOnInit() {
    }
}