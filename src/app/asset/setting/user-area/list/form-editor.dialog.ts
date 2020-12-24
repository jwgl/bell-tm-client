import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { UserAreaService } from '../user-area.service';

@Component({
    templateUrl: 'form-editor.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class UserAreaDialog extends BaseDialog {
    form: any;
    buildings: any;
    teacher: any;

    constructor(private service: UserAreaService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.buildings = this.options.buildings;
        return null;
    }

    protected onConfirmed(): any {
        return this.form;
    }

    onTeacherSelected(teacher: any) {
        if (teacher) {
            this.form.userId = teacher.id;
        }
    }

    receive(item: any, checked: boolean) {
        if (!this.form.buildings) {
            this.form.buildings = [];
        }
        if (checked) {
            this.form.buildings.push(item.value);
        } else {
            const building = this.form.buildings.find(t => t === item.value);
            if (building) {
                this.form.buildings.splice(this.form.buildings.indexOf(building));
            }
        }
    }

    has(item: any): boolean {
        return this.form.buildings && this.form.buildings.some(t => t === item.value);
    }
}
