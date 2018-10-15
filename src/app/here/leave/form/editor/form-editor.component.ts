import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { Schedule, ScheduleDto, Term, Timetable } from 'core/models';

import { LeaveForm, LeaveTypes } from '../../shared/leave-form.model';
import { LeaveFormService } from '../leave-form.service';
import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class LeaveFormEditorComponent {
    form: LeaveForm;
    timetable: Timetable;
    term: Term;

    saving = false;
    leaveTypes = LeaveTypes;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LeaveFormService,
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
        const schedules = dto.schedules.map((scheduleDto: ScheduleDto) => new Schedule(scheduleDto));
        this.form = new LeaveForm(dto.form, schedules);
        this.form.existedItems = dto.existedItems.map((itemDto: any) => this.form.createItem(itemDto)).filter(it => it !== null);
        this.term = dto.term;
        this.timetable = new Timetable(schedules, true);
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
}
