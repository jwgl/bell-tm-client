import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseDialog } from '../dialogs';
import { Http } from '../rest';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    selector: 'workflow-review-dialog',
    templateUrl: 'review.dialog.html',
})
export class WorkflowReviewDialog extends BaseDialog {
    result: { what: string, to: string, comment: string, review: string };
    wordsCount: number;

    constructor(private http: Http) {
        super();
        this.result = { what: null, to: null, comment: null, review: null };
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        this.wordsCount = this.options.wordsCount;
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

    get checkWords(): boolean {
        return this.wordsCount > 0 && (!this.result.comment || this.result.comment.length < this.wordsCount);
    }

    get checkReviews(): boolean {
        return this.options.reviews != null && this.result.review == null;
    }
}
