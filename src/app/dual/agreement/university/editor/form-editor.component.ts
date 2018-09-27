import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';

import { Major, UniversityForm } from '../form.model';
import { UniversityFormService } from '../form.service';
import './form-editor.model';
import { MajorDialog } from './major-item/major.dialog';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class UniversityFormEditorComponent {
    editMode: EditMode;
    form: UniversityForm;
    regions: any[];
    majors: any[];

    constructor(
        private service: UniversityFormService,
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
        this.form = new UniversityForm(dto.form);
        this.form.removedItems = [];
        this.regions = dto.regions;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validate: string[] = [];
        if (this.isEmpty(this.form.nameCn) ||
            this.isEmpty(this.form.nameEn) ||
            this.isEmpty(this.form.regionId) ||
            this.isEmpty(this.form.shortName)) {
            validate.push('请检国外大学中文名、英文名、英文名缩写、项目等是否为空');
        }
        if (this.form.shortName && this.form.shortName.length > 10) {
            validate.push('大学英文名缩写长度不能超过10');
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
        const its = this.form.items.map(item => item.id);
        this.dialog.open(MajorDialog).then(result => {
            const item = new Major(this.form, result);
            this.form.addItem(item);
        });
    }
}
