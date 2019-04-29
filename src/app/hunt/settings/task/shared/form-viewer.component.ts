import { Component, Input } from '@angular/core';

import * as dayjs from 'dayjs';

@Component({
    selector: 'tm-task-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;

    expireClass(date: string): string {
        return dayjs().isAfter(dayjs(date).add(1, 'day')) ? 'badge badge-danger' : 'badge';
    }

    get downloadUrl(): string {
        return `/api/hunt/attachments/${this.vm.id}?type=TASK`;
    }
}
