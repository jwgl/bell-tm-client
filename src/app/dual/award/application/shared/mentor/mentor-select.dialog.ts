import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'mentor-select.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class MentorSelectDialog extends BaseDialog {
    mentors: any;
    teacherId: string;

    protected onOpening(): Observable<any> {
        this.mentors = this.options.mentors;
        return null;
    }

    protected onConfirmed(): any {
        return this.teacherId;
    }
}
