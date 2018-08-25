import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Schedule, ScheduleDto, Timetable } from 'core/models';

import { FreeListenForm, FreeListenSettings } from '../shared/free-listen-form.model';
import { FreeListenViewService } from './free-listen-view.service';

@Component({
    templateUrl: 'free-listen-view.component.html',
})
export class FreeListenViewComponent {
    form: FreeListenForm;
    settings: FreeListenSettings;
    timetable: Timetable;

    constructor(
        private route: ActivatedRoute,
        private service: FreeListenViewService,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number) {
        this.service.loadItem<{
            form: any,
            studentSchedules: any[],
            departmentSchedules: any[],
            settings: any,
        }>(id).subscribe(dto => {
            const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
            const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
            this.form = new FreeListenForm(dto.form, studentSchedules);
            this.settings = new FreeListenSettings(dto.settings);
            this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
        }, (error) => {
            if (error.status === 403) {
                alert('无权查看');
            }
        });
    }
}
