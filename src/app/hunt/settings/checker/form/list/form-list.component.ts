import {Component} from '@angular/core';

import {CommonDialog} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';

import {CheckerForm} from '../../shared/form.model';

import {CheckerFormDialog} from '../editor/form-editor.component';
import {CheckerFormService} from '../form.service';

@Component({
    templateUrl: 'form-list.component.html',
})
export class CheckerListComponent {
    checkers: CheckerForm[];

    constructor(
        private service: CheckerFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any[]) => this.checkers = dto.map(it => new CheckerForm(it)));
    }

    open() {
        this.dialog.open(CheckerFormDialog).then(form => {
            this.service.save(0, form).subscribe(id => {
                this.loadData();
            });
        });
    }

    remove(item: CheckerForm) {
        this.dialogs.confirm('警告', `确定要删除 ${item.teacherName} ？`).then(() => {
            this.service.delete(item.id).subscribe(() => {
                this.loadData();
            });
        });
    }
}
