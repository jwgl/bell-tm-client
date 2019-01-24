import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { ChangeTypeList } from '../../../../settings/shared/constants';

import { ProjectForm } from '../../../application/form/shared/form.model';
import { FileTypes } from '../../../application/shared/constants';
import { ChangeFormService } from '../form.service';
import { ChangeForm } from '../shared/form.model';
import './form-editor.model';
@Component({
    styles: ['.file-type { font-weight: bold; }'],
    templateUrl: 'form-editor.component.html',
})
export class ChangeFormEditorComponent {
    form: ChangeForm;
    project: ProjectForm;
    projects: any;
    changeTypes = ChangeTypeList.filter(t => t.value !== 1);
    fileType = FileTypes.find(ft => ft.reviewType === 1).fileType.find(t => t.prefix === 'main');
    editMode: EditMode;
    saving = false;
    middleChecked = false;

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
            this.service.loadDataForCreate().subscribe(dto => {
                this.loadData(dto);
            });
        }
    }

    loadData(dto: any) {
        this.form = new ChangeForm(dto.form);
        this.projects = dto.projects;
        if (dto.project) {
            this.project = new ProjectForm(dto.project);
        }
    }

    onSelectProject(project: any) {
        this.form.projectId = project ? project.id : 0;
        if (this.form.projectId) {
            this.service.loadProject(this.form.projectId).subscribe((dto: any) => {
                this.project = new ProjectForm(dto);
                this.middleChecked = (dto.hasMid > 0);
            });
        }
    }

    get isCreateMode(): boolean {
        return this.editMode === EditMode.Create;
    }

    receive(item: any, checked: boolean) {
        if (checked) {
            this.form.type.push(item.value);
        } else {
            const type = this.form.type.find(t => t === item.value);
            if (type) {
                this.form.type.splice(this.form.type.indexOf(type), 1);
                // 取消选择变更内容时，要将相应的输入清空
                switch (type) {
                    case 2:
                        this.form.middleYear = null;
                        this.form.knotYear = null;
                        break;
                    case 3:
                        this.form.name = null;
                        break;
                    case 4:
                        this.form.content = null;
                        break;
                    case 6:
                        this.form.achievements = null;
                        break;
                    case 8:
                        this.form.other = null;
                        break;
                }
            }
        }
    }

    has(item: any): boolean {
        return this.form.type.some(t => t === item.value);
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const error = this.form.type.reduce((validation: any, item) => {
            switch (item) {
                case 3:
                    if (!this.form.name) {
                        validation.push('项目名不能为空！');
                    }
                    break;
                case 4:
                    if (!this.form.content) {
                        validation.push('请输入主要内容');
                    } else if (this.form.content.length > 1500) {
                        error.push('主要内容不要超过1500字！');
                    }
                    break;
                case 6:
                    if (!this.form.achievements) {
                        validation.push('请输入预期成果');
                    } else if (this.form.achievements.length > 1500) {
                        error.push('预期成果不要超过1500字！');
                    }
                    break;
                case 7:
                    if (this.form.checkMembers()) {
                        validation.push('请输入参与人');
                    }
                    break;
                case 8:
                    if (this.isEmpty(this.form.other)) {
                        validation.push('请输入其他变更信息');
                    } else if (this.form.other.length > 800) {
                        error.push('其他变更信息不要超过800字！');
                    }
                    break;
            }
            return validation;
        }, []);
        if (!this.form.reason) {
            error.push('请输入变更理由！');
        }
        if (!this.form.mainInfoForm) {
            error.push('请先上传申报书');
        }
        return error;
    }

    create() {
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
        const validation = this.validate();
        if (validation.length) {
            this.dialogs.error(validation);
        } else {
            this.saving = true;
            if (this.form.type.some(t => t === 2)) {
                if (!this.middleChecked) {
                    this.form.middleYear = this.project.middleYear + 1;
                }
                this.form.knotYear = this.project.knotYear + 1;
            }
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
}
