import { Component } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { ApprovalService } from './approval.service';

@Component({
    templateUrl: 'expert-team.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class TeamDialog extends BaseDialog {
    list: any[];
    teamSelected: number;

    constructor(private service: ApprovalService) {
        super();
    }

    loadData() {
        this.service.loadTeam().subscribe(dto => {
            this.list = [];
            const data = _.groupBy(dto, 'team');
            _.each(data, (value: any[], key) => {
                this.list.push({ id: key, members: _.chain(value).map((t: any) => t.teacherName).join('、').value() });
            });
        });
    }

    protected onOpening(): Observable<any> {
        this.loadData();
        return null;
    }

    protected onConfirmed(): any {
        return this.teamSelected;
    }
}
