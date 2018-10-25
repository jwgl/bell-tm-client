import {Location} from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { LevelList } from '../../../../settings/shared/constants';

import { ProjectFormService } from '../form.service';
import { Degrees, Disciplines, Offices, ProjectForm, PropertyComment, Titles } from '../shared/form.model';
import './form-editor.model';
@Component({
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
    reviewTaskId: number;

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
            this.service.loadItemForEdit(params['id']).subscribe(dto => this.loadData(dto));
        } else {
            this.service.loadDataForCreate().subscribe(dto => this.loadData(dto));
            this.reviewTaskId = params['reviewTaskId'];
        }
    }

    loadData(dto: any) {
        this.form = new ProjectForm(dto.form);
        this.departments = dto.departments;
        this.subtypes = dto.subtypes;
        this.origins = dto.origins;
    }

    isEmpty(option: any): boolean {
        return _.isUndefined(option) || _.isNull(option);
    }

    validate(): string[] {
        const validation: string[] = [];
        _.forEach(PropertyComment, (value: string, key: string) => {
            if (this.isEmpty(this.form.toServerDto()[key])) {
                validation.push(`${value}为空`);
            }
        });
        return validation;
    }

    filterByTitle(name: string) {
        return (discipline: any) => discipline.title === name;
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
            this.form.reviewTaskId = this.reviewTaskId;
            this.service.save(this.form.id, this.form.toServerDto()).subscribe(() => this.router.navigate(['/']));
        }
    }
}
