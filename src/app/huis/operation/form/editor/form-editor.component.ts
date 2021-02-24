import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { OperationForm } from '../../shared/operation-form.model';
import { OperationFormService } from '../operation-form.service';
import './form-editor.model';

import * as dayjs from 'dayjs';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class OperationFormEditorComponent {
    form: OperationForm;
    extraFacilities: any[];
    zoneOffset: string;
    saving = false;
    maxCount = 8;
    lowerDate: string;
    lowerTime: string;
    upperDate: string;
    upperTime: string;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: OperationFormService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            const id = params['id'] ?? this.route.snapshot.queryParams['formId']
            this.service.loadItemForEdit(id).subscribe(dto => this.onLoadData(dto));
        });
    }

    onLoadData(dto: any) {
        this.form = new OperationForm(dto.form);
        this.form.zoneOffset = dto.zoneOffset;
        this.extraFacilities = dto.extraFacilities;
        this.lowerDate = dayjs(this.form.actualLowerTime ?? this.form.bookingLowerTime).format('YYYY-MM-DD')
        this.lowerTime = dayjs(this.form.actualLowerTime ?? this.form.bookingLowerTime).format('HH:mm')
        this.upperDate = dayjs(this.form.actualUpperTime ?? this.form.bookingUpperTime).format('YYYY-MM-DD')
        this.upperTime = dayjs(this.form.actualUpperTime ?? this.form.bookingUpperTime).format('HH:mm')
    }

    onSubmit() {
        this.saving = true;
        this.form.updateLowerTime(this.lowerDate, this.lowerTime);
        this.form.updateUpperTime(this.upperDate, this.upperTime);
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, errorRsp => {
            this.saving = false;
            alert(errorRsp.error.message);
        });
    }
}
