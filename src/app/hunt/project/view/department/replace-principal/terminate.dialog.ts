import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'terminate.dialog.html',
})
export class TerminateComponent extends BaseDialog {
    result: { what: string, comment: string };
    wordsCount: number;

    constructor() {
        super();
        this.result = { what: null, comment: null };
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        this.wordsCount = this.options.wordsCount;
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }

    get checkWords(): boolean {
        return this.wordsCount > 0 && (!this.result.comment || this.result.comment.length < this.wordsCount);
    }
}
