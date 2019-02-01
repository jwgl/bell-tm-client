import {Component} from '@angular/core';

import * as _ from 'lodash';
import {Observable} from 'rxjs';

import {BaseDialog} from 'core/dialogs';

import { ExpertFormService } from '../form.service';

@Component({
    templateUrl: 'team.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class TeamDialog extends BaseDialog {
    list: any[];
    teacher: any;

    constructor(private service: ExpertFormService) {
        super();
    }

    loadData() {
        this.service.loadTeam().subscribe(dto => {
            this.list = [];
            const data = _.groupBy(dto, 'team');
            _.each(data, (value: any[], key) => {
                this.list.push({id: key, members: _.chain(value).map((t: any) => t.teacherName).join('、').value()});
            });
        });
    }

    dismiss(teamId: number) {
        this.service.dismiss(teamId).subscribe(() => this.loadData());
    }

    protected onOpening(): Observable<any> {
        this.loadData();
        return null;
    }

    protected onConfirmed(): any {
        return null;
    }
}
