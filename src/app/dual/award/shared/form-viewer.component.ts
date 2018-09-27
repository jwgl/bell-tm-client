import { Component, Input } from '@angular/core';

import * as dayjs from 'dayjs';

@Component({
    selector: 'tm-award-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class AwardFormViewerComponent {
    @Input() vm: any;

    expireClass(date: string): string {
        return dayjs().isAfter(dayjs(date)) ? 'badge badge-danger' : 'badge';
    }
}
