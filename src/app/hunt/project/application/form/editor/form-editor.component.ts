import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { LevelList } from '../../../../settings/shared/constants';
import { FileTypes } from '../../shared/constants';

import { ProjectFormService } from '../form.service';
import { Degrees, Disciplines, Offices, ProjectForm, Titles, PropertyCommentForSave } from '../shared/form.model';
import './form-editor.model';
@Component({
    styles: ['.file-type { font-weight: bold; }'],
    templateUrl: 'form-editor.component.html',
})
export class ProjectFormEditorComponent {
    form: ProjectForm;
    departments: any[];
    subtypes: any[];
    origins: any[];
    levels = LevelList;
    titles = Titles;
    offices = Offices;
    degrees = Degrees;
    disciplines = Disciplines;
    editMode: EditMode;
    saving = false;
    fileTypes = FileTypes.find(f => f.reviewType === 1).fileType;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectFormService,
        private dialogs: CommonDialog,
        private location: Location,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        if (this.editMode === EditMode.Edit) {
            this.service.loadItemForEdit(params['applicationId']).subscribe(dto => this.loadData(dto));
        } else {
            this.service.loadDataForCreate().subscribe(dto => {
                this.loadData(dto);
                this.form.reviewTaskId = params['reviewTaskId'];
            });
        }
    }

    loadData(dto: any) {
        this.form = new ProjectForm(dto.form);
        this.form.tranFile(this.fileTypes);
        this.departments = dto.departments;
        this.subtypes = dto.subtypes;
        this.origins = dto.origins;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validation: string[] = [];
        _.forEach(PropertyCommentForSave, (value: string, key: string) => {
            if (this.isEmpty(this.form.toServerDto()[key])) {
                validation.push(`${value}为空`);
            }
        });
        if (this.form.content && this.form.content.length > 600) {
            validation.push('主要内容不要超过600字！');
        }
        if (this.form.achievements && this.form.achievements.length > 600) {
            validation.push('预期成果不要超过600字！');
        }
        return validation;
    }

    get majors(): string[] {
        const majors = _.chain(this.disciplines)
            .filter((discipline: any) => discipline.title === this.form.discipline)
            .map(data => data.majors)
            .flatMap()
            .value();
        return majors;
    }

    goBack(): void {
        this.location.back();
    }

    save() {
        const validation = this.validate();
        if (validation.length) {
            this.dialogs.error(validation);
        } else {
            this.saving = true;
            this.service.save(this.form.id, this.form.toServerDto()).subscribe(id => {
                const navigation = this.editMode === EditMode.Edit ? ['..'] : ['../applications', id];
                this.dialogs.confirm('', `“${this.form.name}” 保存成功！`).then(() =>
                    this.router.navigate(navigation, { relativeTo: this.route }));
            });
        }
    }

    uploadOptions(fileType: any): any {
        const max = fileType.prefix === 'proof' ? 3 : 1;
        return { concurrency: 3, maxUploads: max - fileType.names.length };
    }

    get uploadUrl(): string {
        return this.service.getUploadUrl({ taskId: this.form.reviewTaskId });
    }
}
