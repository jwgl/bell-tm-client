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
        return dayjs().isAfter(dayjs(date).add(1, 'day')) ? 'badge badge-danger' : 'badge';
    }

    imgSrc(filename: string): string {
        return `/api/dual/picture?fileName=${filename ? filename : ''}`;
    }
}
