import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { Degrees, Offices, ProjectForm, Titles } from '../../../application/form/shared/form.model';
import { ChangeFormService } from '../form.service';
import { FileTypes } from '../../../application/shared/constants';
import { ChangeForm } from '../../../info-change/form/shared/form.model';
import './form.model';

const PropertyComment = {
    principalId: '负责人',
    email: 'Email',
    title: '职称',
    degree: '学位',
    office: '职务',
    phone: '电话',
    mainInfoForm: '申报书',
};

@Component({
    styles: ['.file-type { font-weight: bold; }'],
    templateUrl: 'form-editor.component.html',
})
export class ChangeFormEditorComponent {
    form: ChangeForm;
    project: ProjectForm;
    fileType = FileTypes.find(ft => ft.reviewType === 1).fileType.find(t => t.prefix === 'main');
    editMode: EditMode;
    saving = false;
    middleChecked = false;
    teacher: any;
    titles = Titles;
    offices = Offices;
    degrees = Degrees;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ChangeFormService,
        private dialogs: CommonDialog,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        if (this.editMode === EditMode.Edit) {
            this.service.loadItemForEdit(params['id']).subscribe(dto => this.loadData(dto));
        } else {
            this.service.loadDataForCreate({ projectId: params['id'] }).subscribe(dto => {
                this.loadData(dto);
            });
        }
    }

    loadData(dto: any) {
        this.form = new ChangeForm(dto.form);
        this.form.tranFile(this.fileType);
        this.project = new ProjectForm(dto.project);
    }

    get isCreateMode(): boolean {
        return this.editMode === EditMode.Create;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const error: string[] = [];
        _.forEach(PropertyComment, (value: string, key: string) => {
            if (this.isEmpty(this.form.toServerDto()[key])) {
                error.push(`${value}为空`);
            }
        });
        if (!this.form.reason) {
            error.push('请输入变更理由！');
        } else if (this.form.reason.length > 999) {
            error.push('变更理由不要超过800字！');
        }
        return error;
    }

    create() {
        this.form.name = this.project.name;
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.dialogs.confirm('', `变更申请保存成功！`).then(() =>
                this.router.navigate(['..', id], { relativeTo: this.route }));
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    update() {
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.dialogs.confirm('', `变更申请保存成功！`).then(() =>
                this.router.navigate(['..'], { relativeTo: this.route }));
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    save() {
        this.form.principalId = this.teacher ? this.teacher.id : null;
        this.form.projectId = this.project.id;
        const validation = this.validate();
        if (validation.length) {
            this.dialogs.error(validation);
        } else {
            this.saving = true;
            if (this.isCreateMode) {
                this.create();
            } else {
                this.update();
            }
        }
    }

    get uploadUrl(): string {
        return this.service.getUploadUrl();
    }

    onUploaded(fileNames: any) {
        this.form.mainInfoForm = fileNames.name;
    }

    get hasUploaded(): boolean {
        return !_.isEmpty(this.form.mainInfoForm);
    }

    remove() {
        this.form.mainInfoForm = null;
    }

    onTeacherSelected(teacher: any): void {
        if (!teacher) {
            return;
        }
        if (teacher.department === this.project.departmentName) {
            this.teacher = teacher;
        } else {
            alert(`${teacher.name}不是本单位老师，请另选！`);
        }
    }
}
