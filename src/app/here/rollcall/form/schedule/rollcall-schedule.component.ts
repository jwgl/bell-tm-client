import { Component } from '@angular/core';

import { Term, Timetable } from 'core/models';

import { RollcallFormService } from '../rollcall-form.service';

@Component({

    styleUrls: ['rollcall-schedule.component.scss'],
    templateUrl: 'rollcall-schedule.component.html',
})
export class RollcallScheduleComponent {
    constructor(private service: RollcallFormService) { }

    get term(): Term {
        return this.service.term;
    }

    get timetable(): Timetable {
        return this.service.timetable;
    }
}
