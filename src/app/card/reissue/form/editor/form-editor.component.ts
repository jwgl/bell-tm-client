import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { ReissueFormService } from '../reissue-form.service';
import { ReissueForm } from '../../shared/reissue-form.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ReissueFormEditorComponent {
    form: ReissueForm;
    saving = false;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ReissueFormService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
                    break;
            }
        });
    }

    onLoadData(dto: any) {
        this.form = new ReissueForm(dto.form, dto.student);
    }

    save() {
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
        this.service.create({
            reason: this.form.reason,
        }).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, {
            reason: this.form.reason,
        }).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }
}
