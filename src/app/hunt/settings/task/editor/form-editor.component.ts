import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as _ from 'lodash';
import * as moment from 'moment';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { LevelList, TypeList } from '../../shared/constants';

import { FormService } from '../form.service';
import { TaskForm } from '../shared/form.model';
import './form-editor.model';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class TaskFormEditorComponent {
    editMode: EditMode;
    form: TaskForm;
    types = TypeList;
    bans = LevelList;

    constructor(
        private service: FormService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private dialogs: CommonDialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        if (this.editMode === EditMode.Edit) {
            this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
        } else {
            this.form = new TaskForm([]);
            this.form.type = 'APPLICATION';
        }
    }

    onLoadData(dto: any) {
        this.form = new TaskForm(dto);
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    isDate(value: string): boolean {
        return moment(value, 'YYYY-MM-DD', true).isValid();
    }

    checkDate(value: any, name: string): string {
        if (this.isEmpty(value)) {
            return  `${name} 不能为空！`;
        } else if (!this.isDate(value)) {
            return `${name} 日期格式不正确！`;
        }
    }

    validate(): string[] {
        const validation: string[] = [];
        if (this.isEmpty(this.form.title) ||
            this.isEmpty(this.form.content)) {
                validation.push('请检查标题、内容等是否为空！');
        }
        if (!this.isDate(this.form.startDate)) {
            validation.push('申请起始日期输入不正确！');
        }
        if (!this.isDate(this.form.endDate)) {
            validation.push('申请截止日期输入不正确！');
        }
        return validation;
    }

    save() {
        const validation = this.validate();
        if (validation.length) {
            this.dialogs.error(validation);
        } else if (this.editMode === EditMode.Create) {
            this.create();
        } else if (this.editMode === EditMode.Edit) {
            this.update();
        }
    }

    create() {
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        });
    }

    update() {
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        });
    }
}
