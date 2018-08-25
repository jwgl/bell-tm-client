import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Schedule, ScheduleDto } from 'core/models';

import { LeaveForm } from '../shared/leave-form.model';
import { LeaveViewService } from './leave-view.service';

@Component({
    templateUrl: 'leave-view.component.html',
})
export class LeaveViewComponent {
    form: LeaveForm;

    constructor(
        private route: ActivatedRoute,
        private service: LeaveViewService,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number) {
        this.service.loadItem<{
            form: any,
            schedules: any
        }>(id).subscribe(dto => {
            const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
            this.form = new LeaveForm(dto.form, schedules);
        }, (error) => {
            if (error.status === 403) {
                alert('无权查看');
            }
        });
    }
}
