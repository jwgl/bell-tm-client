import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseDialog } from '../dialogs';
import { Http } from '../rest';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    styles: ['.form-control-plaintext { border:none }'],
    templateUrl: 'suggest.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class WorkflowSuggestDialog extends BaseDialog {
    result: { what: string, to: string, comment: string, suggest: string };

    constructor(private http: Http) {
        super();
        this.result = { what: null, to: null, comment: null, suggest: null };
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        if (this.options.whoUrl) {
            return this.http.get(this.options.whoUrl).pipe(tap((value: any[]) => {
                if (value.length >= 1) {
                    this.result.to = value[0].id;
                }
            }));
        } else {
            return null;
        }
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
