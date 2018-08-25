import { Component } from '@angular/core';

import { ReissueFormService } from '../reissue-form.service';

@Component({
    templateUrl: 'form-notice.component.html',
})
export class ReissueFormNoticeComponent {
    notice: string;

    constructor(private service: ReissueFormService) {
        this.service.loadNotice().subscribe(notice => this.notice = notice);
    }
}
