import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';

import { ApplicationForm } from '../../shared/form.model';

import { ApplicationFormService } from '../form.service';

import { MaterialUploaderDialog } from './uploader.dialog';

import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ApplicationFormEditorComponent {
    editMode: EditMode;
    form: ApplicationForm;
    universities: any[];
    fileNames: any;
    awardId: number;
    formId: number;
    saving = false;

    constructor(
        private service: ApplicationFormService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.editMode = this.route.snapshot.data['mode'];
        this.awardId = params['awardId'];
        this.formId = params['id'];
        this.refresh();
    }
    refresh() {
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate({ awardId: this.awardId })
                    .subscribe(dto => this.onLoadData(dto));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(this.formId)
                    .subscribe(dto => this.onLoadData(dto));
                break;
        }
    }

    onLoadData(dto: any) {
        this.fileNames = dto.fileNames;
        this.form = new ApplicationForm(dto.form);
        this.universities = dto.universities;
        if (!this.form.universityCooperative && this.universities.length) {
            this.form.universityCooperative = this.universities[0].universityEn;
        }
        // 确保有值且一致
        if (this.form.awardId) {
            this.awardId = this.form.awardId;
        } else {
            this.form.awardId = this.awardId;
        }
    }

    subjects(universityName: any): any[] {
        if (universityName) {
            const university = this.universities.find(item => item.universityEn === universityName);
            return university ? university.subjects : null;
        } else {
            return null;
        }
    }

    imgSrc(filename: string): string {
        return `/api/dual/picture?awardId=${this.awardId}&studentId=${this.form.studentId}&fileName=${filename ? filename : ''}`;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validate: string[] = [];
        if (this.isEmpty(this.form.universityCooperative) ||
            this.isEmpty(this.form.majorCooperative) ||
            this.isEmpty(this.form.bachelorYear) ||
            this.isEmpty(this.form.email) ||
            this.isEmpty(this.form.linkman) ||
            this.isEmpty(this.form.phone)) {
            validate.push('请检查合作大学、国外专业、获得学位年份、Email、联系人、联系人电话等是否为空');
        } else {
            const day = new Date();
            if (this.form.bachelorYear < 2000 || (this.form.bachelorYear > day.getFullYear())) {
                validate.push('获得学位年份无效！');
            }
        }
        return validate;
    }

    save() {
        const validate = this.validate();
        if (validate.length) {
            this.dialogs.error(validate);
        } else {
            if (this.editMode === EditMode.Create) {
                this.create();
            } else if (this.editMode === EditMode.Edit) {
                this.update();
            }
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../../', id], { relativeTo: this.route });
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../../', id], { relativeTo: this.route });
        });
    }

    url(filename: string): string {
        return `/api/dual/picture/fileview?awardId=${this.awardId}&fileName=${filename ? filename : ''}`;
    }

    open(filename: string) {
        if (!filename) {
            return;
        }
        window.open(this.url(filename), '文件浏览',
            'fullscreen=1, toolbar=0, menubar=0, location=0, status=0, scrollbars=1, resizable=0');
    }

    get cooperativeMajor(): any {
        const university = this.universities.find(item => item.universityEn === this.form.universityCooperative);
        if (university) {
            return university.subjects.find(subject =>
                subject.majorEn === this.form.majorCooperative
                && subject.bachelor === this.form.bachelor);
        } else {
            return null;
        }
    }

    set cooperativeMajor(item: any) {
        this.form.majorCooperative = item.majorEn;
        this.form.bachelor = item.bachelor;
    }

    get uploadUrl(): string {
        return this.service.getUploadUrl({ awardId: this.awardId });
    }

    upload(prefix: string) {
        this.fileNames[prefix] = undefined;
        const uploadUrl = this.uploadUrl;
        this.dialog.open(MaterialUploaderDialog, { prefix, uploadUrl })
            .then(() => {
                this.refresh();
                this.form.majorCooperative = '';
            });
    }
}
