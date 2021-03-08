import { Component } from '@angular/core';

import { Dialog } from 'core/dialogs';

import { TypeEditorDialog } from '../editor/type-dialog';
import { Type } from '../type.model';
import { TypeService } from '../type.service';

@Component({
    selector: 'tm-type-list',
    templateUrl: 'type-list.component.html',
})
export class TypeComponent {
    list: Type[];
    ths = [
        { id: 'parentName', label: '主类', order: true, filter: true },
        { id: 'name', label: '类别名称', order: true },
        { id: 'periodOfUniversity', label: '周期(年)' },
        { id: 'enabled', label: '在用', order: true },
    ];
    constructor(private service: TypeService, private dialog: Dialog) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe(dto => {
            this.list = dto.map((data: any) => new Type(data));
        });
    }

    open() {
        this.dialog.open(TypeEditorDialog, {}).then(result => {
            this.service.save(null, result).subscribe(() => this.loadData());
        });
    }

    edit(value: Type) {
        this.dialog.open(TypeEditorDialog, value).then(result => {
            this.service.update(result.id, result).subscribe(() => this.loadData());
        });
    }
}
