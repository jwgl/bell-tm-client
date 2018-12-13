import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { CheckboxSelectorComponent } from 'core/common-directives';

import { ProjectOptionDialog } from './project-option.dialog';
import { FormService } from '../form.service';

@Component({
    templateUrl: 'project-select.component.html',
})
export class ProjectSelectComponent {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    departments: any;
    subtypes: any;
    middleYears: any;
    knotYears: any;
    options: any;
    taskId: number;
    list: any;
    reportType: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: FormService,
        private dialog: Dialog,
    ) {
        const params = this.route.snapshot.params;
        this.taskId = params['id'];
        this.service.loadDataForProjectOptions(this.taskId).subscribe(dto => {
            this.departments = dto.departments;
            this.subtypes = dto.subtypes;
            this.middleYears = dto.middleYears;
            this.knotYears = dto.knotYears;
        });
    }

    query() {
        this.dialog.open(ProjectOptionDialog, {
            departments: this.departments,
            subtypes: this.subtypes,
            middleYears: this.middleYears,
            knotYears: this.knotYears,
        }).then(result => {
            if (result.reportType) {
                this.reportType = result.reportType;
                result.queryType = 'forCheck';
                this.service.loadProjects(this.taskId, result).subscribe(dto => this.list = dto);
            } else {
                alert('请先选择检查阶段！');
            }
        });
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    addForCheck() {
        const idList = this.selectors.filter(d => d.checked).map(s => s.data.id);
        this.service.batchCreateReview(this.taskId, this.reportType, idList).subscribe(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
        });
    }

}
