import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';

import { AgreementForm, AgreementItem } from '../../shared/form.model';
import { UniversityForm } from '../../university/form.model';
import { AgreementFormService } from '../form.service';
import './form-editor.model';
import { MajorDialog } from './major-item/major.dialog';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class AgreementFormEditorComponent {
    editMode: EditMode;
    form: AgreementForm;
    majors: any[];
    universities: UniversityForm[];
    coMajors: any[];

    constructor(
        private service: AgreementFormService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogs: CommonDialog,
        private dialog: Dialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
        if (this.editMode === EditMode.Edit) {
            this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
        }
    }

    onLoadData(dto: any) {
        this.form = new AgreementForm(dto.form);
        this.form.removedItems = [];
        this.majors = dto.majors.filter((major: any) => major.enabled);
        this.universities = dto.universities;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validate: string[] = [];
        if (this.isEmpty(this.form.agreementName) ||
            this.isEmpty(this.form.university)) {
            validate.push('请检查协议名称、合作大学等是否为空');
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
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        });
    }

    update() {
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../../', id], { relativeTo: this.route });
        });
    }

    addItem() {
        this.service.getCoMajors(this.form.university.id).subscribe(dto => {
            const agreementMajor = {};
            this.coMajors = dto;
            const its = this.form.items.map(item => item.id);
            this.dialog.open(MajorDialog, { majors: this.majors, items: its, coMajors: dto, agreementMajor }).then(result => {
                const item = new AgreementItem(result);
                this.form.addItem(item);
            });
        });
    }

    editItem(itemForEdit: any) {
        this.form.removeItem(itemForEdit);
        this.service.getCoMajors(this.form.university.id).subscribe(dto => {
            this.coMajors = dto;
            const its = this.form.items.map(item => item.id);
            this.dialog.open(MajorDialog,
                { majors: this.majors, items: its, coMajors: this.coMajors, agreementMajor: itemForEdit },
            ).then(result => {
                const item = new AgreementItem(result);
                this.form.addItem(item);
            });
        });
    }

    onUniversitySelected(university: any): void {
        // 更换合作大学要清空所有协议专业
        if (university && (!this.form.university || this.form.university.nameEn !== university.nameEn)) {
            this.form.university = university;
            this.form.items = [];
        }
    }

    filterBySubject(name: string) {
        return (major: any) => major.subjectName === name;
    }
}
