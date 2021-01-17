import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
    
@Component({
    selector: 'sus-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})

export class EventComponent implements OnInit {
    constructor() {}

    eventForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    start: new FormControl(),
    end: new FormControl(),
    });

    @Output()
    newEvent: EventEmitter<Event> = new EventEmitter();

    handleSubmit() {
    const event = this.eventForm.value;
    this.newEvent.emit({
        ...event,
    });
    this.eventForm.reset();
    }
    ngOnInit() {}
}