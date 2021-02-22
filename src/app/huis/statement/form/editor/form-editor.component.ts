import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { Department } from '../../../shared/common.model';
import { StatementForm } from '../../shared/statement-form.model';
import { StatementFormService } from '../statement-form.service';
import { FindItemDialogService } from './find-item/find-item.service';
import './form-editor.model';

import * as _ from 'lodash'


@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class StatementFormEditorComponent {
    departments: Department[];
    form: StatementForm;
    findItemOptions: any = {};
    saving = false;
    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: StatementFormService,
        private findItemDialog: FindItemDialogService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                    break;
                case EditMode.Edit:
                    const id = params['id'] ?? this.route.snapshot.queryParams['formId']
                    this.service.loadItemForEdit(id).subscribe(dto => this.onLoadData(dto));
                    break;
            }
        });
    }

    onLoadData(dto: any) {
        this.form = new StatementForm(dto.form);
        this.departments = dto.departments;
        if (!this.form.id) {
            this.form.department = this.departments[0]
        }        
        this.departments = dto.departments;
        this.findItemOptions.form = this.form;
    }

    findRoom() {
        this.findItemDialog.open(this.findItemOptions).then((result: any[]) => {
            result.forEach(it => {
                this.form.addItem(it);
            });
            console.log(this.form)
        });
    }

    onSubmit() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }
}
