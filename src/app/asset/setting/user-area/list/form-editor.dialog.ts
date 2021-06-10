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
    rooms: any;
    teacher: any;

    constructor(private service: UserAreaService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.rooms = this.options.rooms;
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

    onRowSelected(roomsSelected: any) {
        this.form.rooms =
            this.rooms.filter((room: any) => roomsSelected.some(item => room.id === item.id))
                .map(room => room.id);
    }
}
