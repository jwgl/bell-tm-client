import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';
import { Http } from 'core/rest';

import {ApprovalService } from '../approval.service';

@Component({
    templateUrl: 'mentor-select.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class MentorSelectDialog extends BaseDialog {
    mentors: any;
    teacherId: string;

    constructor(private http: Http, private service: ApprovalService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.http.get(`${this.service.api.list()}/mentors`).subscribe(dto => this.mentors = dto);
        return null;
    }

    protected onConfirmed(): any {
        return this.teacherId;
    }
}

