import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as dayjs from 'dayjs';
import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { LevelList } from '../../../../settings/shared/constants';

import { ProjectService } from '../viewer.service';
import { ProjectForm } from '../../../application/form/shared/form.model';
import './form-editor.model';

export const PropertyComment = {
    name: '项目名称',
    principalId: '负责人',
    level: '项目等级',
    subtypeObject: '类别',
    code: '编号',
    dateStarted: '立项日期',
    middleYear: '中期年份',
    knotYear: '结项年份',
    departmentId: '单位',
    originId: '项目来源',
};
@Component({
    templateUrl: 'form-editor.component.html',
})
export class ProjectFormEditorComponent {
    form: ProjectForm;
    departments: any[];
    subtypes: any[];
    origins: any[];
    levels = LevelList;
    editMode: EditMode;
    saving = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectService,
        private dialogs: CommonDialog,
        private location: Location,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        this.service.loadDataForCreate().subscribe(dto => {
            this.loadData(dto);
        });
    }

    loadData(dto: any) {
        this.form = new ProjectForm(dto.form);
        this.departments = dto.departments;
        this.subtypes = dto.subtypes;
        this.origins = dto.origins;
    }

    isDate(value: string): boolean {
        return dayjs(value).format('YYYY-MM-DD') === value;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validation: string[] = [];
        _.forEach(PropertyComment, (value: string, key: string) => {
            if (this.isEmpty(this.form[key])) {
                validation.push(`${value}为空`);
            }
        });
        if (!validation.length) {
            // 判断中期和结项年份是否符合当前类别的周期设定
            const projectCycle = this.period;
            const yearStarted = dayjs(this.form.dateStarted).year();
            if (projectCycle > 1) {
                if (this.form.middleYear !== yearStarted + Math.floor((projectCycle + 1) / 2)) {
                    validation.push(`中期年份不正确，参考值：${yearStarted + Math.floor((projectCycle + 1) / 2)}`);
                }
            }
            if (this.form.knotYear !== yearStarted + projectCycle) {
                validation.push(`结项年份不正确，参考值：${yearStarted + projectCycle}`);
            }
        }
        return validation;
    }

    save() {
        const validation = this.validate();
        if (validation.length) {
            this.dialogs.error(validation);
        } else {
            this.saving = true;
            this.service.create(this.form.toServerDto()).subscribe(id => {
                this.dialogs.confirm('', `“${this.form.name}” 保存成功！`).then(() =>
                    this.router.navigate(['../', id], { relativeTo: this.route }));
            });
        }
    }

    get period(): number {
        switch (this.form.level) {
            case 'UNIVERSITY':
                return this.form.subtypeObject.periodOfUniversity;
            case 'CITY':
                return this.form.subtypeObject.periodOfCity;
            case 'PROVINCE':
                return this.form.subtypeObject.periodOfProvince;
            case 'NATION':
                return this.form.subtypeObject.periodOfNation;

        }
    }

    onTeacherSelected(teacher: any): void {
        if (!teacher) {
            return;
        }
        this.form.principalId = teacher.id;
    }
}
