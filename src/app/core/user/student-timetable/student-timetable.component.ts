import { Component, OnInit } from '@angular/core';

import { Schedule, ScheduleDto, Term, Timetable } from 'core/models';

import { StudentTimetableService } from './student-timetable.service';

@Component({
    styleUrls: ['student-timetable.component.scss'],
    templateUrl: 'student-timetable.component.html',
})
export class StudentTimetableComponent implements OnInit {
    term: Term;
    timetable: Timetable;

    constructor(private service: StudentTimetableService) { }

    ngOnInit(): void {
        this.service.loadList().subscribe((dto: any) => {
            this.term = dto.term;
            this.timetable = new Timetable(dto.schedules.map((it: ScheduleDto) => new Schedule(it)), true);
        });
    }
}
