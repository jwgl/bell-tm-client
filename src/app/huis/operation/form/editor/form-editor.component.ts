import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OperationForm } from '../../shared/operation-form.model';
import { OperationFormService } from '../operation-form.service';
import './form-editor.model';

import * as dayjs from 'dayjs';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class OperationFormEditorComponent {
    formId: number;
    form: OperationForm;
    extraFacilities: any[];
    zoneOffset: string;
    saving = false;
    lowerDate: string;
    lowerTime: string;
    upperDate: string;
    upperTime: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: OperationFormService,
    ) {
        this.route.params.subscribe(params => {
            this.formId = +(params['id'] ?? this.route.snapshot.queryParams['formId']);
            this.loadItem();
        });
    }

    loadItem() {
        this.service.loadItemForEdit<any>(this.formId).subscribe(dto => {
            this.form = new OperationForm(dto.form);
            this.form.zoneOffset = dto.zoneOffset;
            this.extraFacilities = dto.extraFacilities;
            this.lowerDate = dayjs(this.form.actualLowerTime ?? this.form.bookingLowerTime).format('YYYY-MM-DD')
            this.lowerTime = dayjs(this.form.actualLowerTime ?? this.form.bookingLowerTime).format('HH:mm')
            this.upperDate = dayjs(this.form.actualUpperTime ?? this.form.bookingUpperTime).format('YYYY-MM-DD')
            this.upperTime = dayjs(this.form.actualUpperTime ?? this.form.bookingUpperTime).format('HH:mm')
        });
    }

    toggleUsed() {
        this.service.updateUsage(this.formId, !this.form.actualUsed).subscribe(() => {
            this.loadItem();
        });
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
