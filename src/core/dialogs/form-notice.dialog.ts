import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrl, Http } from '../rest';
import { BaseDialog } from './base-dialog';

/**
 * endPoint: ${apiurl}/notice
 * data: {title, content}
 */
@Component({
    selector: 'form-notice-dialog',
    templateUrl: 'form-notice.dialog.html',
})
export class FormNoticeDialog extends BaseDialog {
    constructor(private rest: Http, private apiUrl: ApiUrl) {
        super();
    }

    protected onOpening(): Observable<any> {
        return this.rest.get(`${this.apiUrl.list()}/notice`);
    }
}
