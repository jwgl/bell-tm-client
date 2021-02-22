import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { BookingForm, BookingType, Department, BookingAuth } from '../../shared/booking-form.model';
import { BookingFormService } from '../booking-form.service';
import { FindRoomDialogService } from './find-room/find-room.service';
import './form-editor.model';

import * as _ from 'lodash'

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class BookingFormEditorComponent {
    form: BookingForm;
    departments: Department[];
    bookingTypes: BookingType[];
    bookingAuths: BookingAuth[];
    zoneOffset: string;
    findRoomOptions: any = {};
    saving = false;
    maxCount = 8;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: BookingFormService,
        private findRoomDialog: FindRoomDialogService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                    break;
                case EditMode.Edit:
                    const id = params['id'] ?? this.route.snapshot.queryParams['formId']
                    this.service.loadItemForEdit(id).subscribe(dto => this.onLoadData(dto));
                    break;
            }
        });
    }

    onLoadData(dto: any) {
        this.form = new BookingForm(dto.form);
        this.form.zoneOffset = dto.zoneOffset;
        this.bookingAuths = dto.bookingAuths;
        this.bookingTypes = dto.bookingTypes;
        this.departments = _.chain(this.bookingAuths)
            .map(it => ({ id: it.departmentId, name: it.departmentName }))
            .uniqBy(it => it.id)
            .value();
        if (dto.form) {
            this.form.department = this.departments.find(it => it.id == dto.form.departmentId)
            this.form.bookingType = this.bookingTypes.find(it => it.id == dto.form.bookingTypeId)
        } else {
            this.form.department = this.departments.find(it => it.id == dto.user.departmentId) ?? this.departments[0];
            this.form.bookingType = this.bookingTypes[0]
            this.form.user = dto.user;
        }
        this.updateBookingTypes(this.form.department)
        this.findRoomOptions.form = this.form;
    }

    onDepartmentChanged(department: Department) {
        this.updateBookingTypes(department);
    }

    private updateBookingTypes(department: Department) {
        this.bookingTypes.forEach(bookingType => {
            const auth = this.bookingAuths.find(it =>
                it.departmentId == department.id && it.bookingTypeId == bookingType.id
            ) ?? this.bookingAuths.find(it =>
                it.departmentId == department.id && it.bookingTypeId == 102
            );

            bookingType.checker = auth ? { id: auth.userId, name: auth.userName } : null;
        })
    }

    findRoom() {
        this.findRoomDialog.open(this.findRoomOptions).then((result: any) => {
            if (this.form.items.length < this.maxCount) {
                this.form.addItem(result);
            } else {
                setTimeout(() => {
                    alert(`借用多于${this.maxCount}项。`);
                }, 10);
            }
        });
    }

    onSubmit() {
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
            alert(error.message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }
}
