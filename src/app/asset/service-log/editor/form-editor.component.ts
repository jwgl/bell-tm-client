import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';

import { EditMode } from 'core/constants';

import { ServiceLogForm, ServiceItem, ServiceType, Status } from '../form.model';
import { ServiceLogFormService } from '../form.service';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ServiceLogFormComponent {
    form: ServiceLogForm;
    departments: any[];
    rooms: any[];
    sections: number[];
    serviceDate: string;
    saving = false;
    termStart: string;
    types = ServiceType;
    items = ServiceItem;
    status = Status;
    assets: any;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ServiceLogFormService,
    ) {
        this.sections = _.range(0, 13, 1);
        this.editMode = this.route.snapshot.data['mode'];
        this.route.params.subscribe(params => {
            if (this.editMode === EditMode.Create) {
                this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
            } else if (this.editMode === EditMode.Edit) {
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
            }
        });
    }

    onLoadData(dto: any) {
        this.form = new ServiceLogForm(dto.form);
        this.termStart = dto.startDate;
        this.departments = dto.departments;
    }

    onPlaceSelected(room: any) {
        this.form.building = room.building;
        this.form.roomName = room.name;
        this.loadContact();
        this.service.findAsset({ building: room.building, roomName: room.name })
            .subscribe(dto => this.assets = dto);
    }

    onDateChange(date: string) {
        this.loadContact();
    }

    onSectionChange(section: string) {
        this.loadContact();
    }

    loadContact() {
        if (this.form.roomName && this.form.logDate && this.form.section !== undefined) {
            this.service.findContact({
                roomName: this.form.roomName,
                logDate: this.form.logDate,
                section: this.form.section.toString(),
            }).subscribe((dto: any) => {
                this.form.contact = dto.contact;
                const department = this.departments.find(item => item.name === dto.department);
                this.form.department = department ? department.id : undefined;
            });
        }
    }

    get today(): string {
        return dayjs().format('YYYY-MM-DD');
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
        }, errorRsp => {
            this.saving = false;
            alert(errorRsp.error.message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, errorRsp => {
            this.saving = false;
            alert(errorRsp.error.message);
        });
    }
}
