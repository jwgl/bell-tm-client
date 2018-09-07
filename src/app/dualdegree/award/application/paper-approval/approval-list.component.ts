import {Component} from '@angular/core';

import * as _ from 'lodash';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class PaperApprovalListComponent {

    get downloadAble(): boolean {
        const match = window.location.href.match(/\/todo+/);
        return !_.isEmpty(match);
    }
}
