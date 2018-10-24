import { Component, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'task-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;

    expireClass(date: string): string {
        return moment().isAfter(date) ? 'badge badge-danger' : 'badge';
    }
}
