import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { Schedule, ScheduleDto, TimeslotItem, Timetable } from 'core/models';

import { FreeListenForm, FreeListenSettings } from '../../shared/free-listen-form.model';
import { FreeListenFormService } from '../free-listen-form.service';
import './form-editor.model';

interface Teacher {
    id: string;
    name: string;
}

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class FreeListenFormEditorComponent {
    form: FreeListenForm;
    settings: FreeListenSettings;
    timetable: Timetable;
    saving = false;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: FreeListenFormService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
                    break;
            }
        });
    }

    onLoadData(dto: any) {
        const schedules = dto.schedules.map((scheduleDto: ScheduleDto) => {
            const schedule: Schedule = new Schedule(scheduleDto);
            schedule.courseTeacherId = scheduleDto.courseTeacherId;
            schedule.courseTeacherName = scheduleDto.courseTeacherName;
            schedule.repeatType = scheduleDto.repeatType;
            return schedule;
        });

        this.form = new FreeListenForm(dto.form, schedules);
        this.form.removedItems = [];
        this.settings = new FreeListenSettings(dto.settings);
        this.timetable = new Timetable(schedules);
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    mouseenter(item: TimeslotItem) {
        this.timetable.getTimeslots(0).forEach(timeslot => {
            timeslot.items.filter(it => it.schedules.some(schedule => {
                return item.schedules.some(s => s.courseClassId === schedule.courseClassId);
            })).forEach(it => it.highlight = true);
        });
    }

    mouseleave(item: TimeslotItem) {
        this.timetable.getTimeslots(0).forEach(timeslot => {
            timeslot.items.forEach(it => it.highlight = false);
        });
    }
}
