import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { Vision } from '../../shared/vision.model';
import { VisionFormService } from '../vision-form.service';
import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class VisionFormEditorComponent {
    vm: Vision;

    private editMode: EditMode;
    private _showSchoolingLength = false;
    private _showAwardedDegree = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: VisionFormService,
        @Inject('DEPARTMENT_VISIONS_URL') private departmentVisionsUrl: string,
        @Inject('SCHEMES_PUBLIC_WEB_URL') private publicSchemesWebUrl: string,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate({
                        program: this.route.snapshot.queryParams['program']
                    }).subscribe(dto => this.vm = new Vision(dto));
                    break;
                case EditMode.Revise:
                    this.service.loadItemForRevise(params['id']).subscribe(dto => this.vm = new Vision(dto));
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.vm = new Vision(dto));
                    break;
            }
        });
    }

    get showSchoolingLength(): boolean {
        return this._showSchoolingLength || this.vm && !!this.vm.schoolingLength;
    }

    get showAwardedDegree(): boolean {
        return this._showAwardedDegree || this.vm && !!this.vm.awardedDegree;
    }

    get canEditVersion(): boolean {
        return this.editMode === EditMode.Create || this.editMode === EditMode.Revise;
    }

    versionChanged(newValue: number) {
        this.vm.versionNumber = newValue;
    }

    cancel() {
        switch (this.editMode) {
            case EditMode.Create:
                this.router.navigate(['/']);
                break;
            case EditMode.Revise:
                this.router.navigate(['/', this.vm.previousId]);
                break;
            case EditMode.Edit:
                this.router.navigate(['/', this.vm.id]);
                break;
        }
    }

    import() {
        this.dialog.list(
            '选择导入的专业',
            this.departmentVisionsUrl.replace('${departmentId}', this.vm.departmentId),
            (item: any) => `${item.grade}级${item.subjectName}`,
        ).then(id => {
            this.service.loadDataForImport(id).subscribe(vision => {
                this.vm.objective = vision.objective;
                this.vm.specification = vision.specification;
                this.vm.schoolingLength = vision.schoolingLength;
                this.vm.awardedDegree = vision.awardedDegree;
            });
        });
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.service.create(this.vm.toCreateDto()).subscribe(
                    id => this.router.navigate(['../', id], { relativeTo: this.route }),
                    error => alert(JSON.stringify(error)),
                );
                break;
            case EditMode.Revise:
                this.service.revise(this.vm.toReviseDto()).subscribe(
                    id => this.router.navigate(['../../', id], { relativeTo: this.route }),
                    error => alert(JSON.stringify(error)),
                );
                break;
            case EditMode.Edit:
                this.service.update(this.vm.id, this.vm.toUpdateDto()).subscribe(
                    id => this.router.navigate(['../'], { relativeTo: this.route }),
                    error => alert(JSON.stringify(error)),
                );
                break;
        }
    }
}
