import { Component, QueryList, ViewChildren } from '@angular/core';

import { CommonDialog } from 'core/common-dialogs';
import {CheckboxSelectorComponent} from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { TeacherSelectDialog } from 'core/dialogs/teacher-select.dialog';

import { ExpertForm } from '../form.model';

import { ExpertFormService } from '../form.service';

import { TeamDialog } from './team.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class ExpertListComponent {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    experts: ExpertForm[];

    constructor(
        private service: ExpertFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any[]) => this.experts = dto.map(it => new ExpertForm(it)));
    }

    open() {
        this.dialog.open(TeacherSelectDialog).then(form => {
            this.service.save(0, {teacherId: form.id}).subscribe(() => {
                this.loadData();
            });
        });
    }

    view() {
        this.dialog.open(TeamDialog).then(() => this.loadData());
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    makeTeam() {
        const idList = this.selectors.filter(s => s.checked).map(s => s.data.id);
        if (idList && idList.length) {
            this.service.makeTeam({ids: idList})
            .subscribe(() => {
                this.loadData();
            });
        }
    }

    remove(item: ExpertForm) {
        this.dialogs.confirm('警告', `确定要删除 ${item.teacherName} ？`).then(() => {
            this.service.delete(item.id).subscribe(() => {
                this.loadData();
            });
        });
    }
}
