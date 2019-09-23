import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'review.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ReviewDialog extends BaseDialog {
    vm: any;
    conclusion: string;
    opinion: string;
    conclusions = ['同意', '不同意', '弃权'];
    isCommit = false;
    score: number;

    protected onOpening(): Observable<any> {
        this.vm = this.options.reviewInfo;
        this.opinion = this.vm.opinion;
        this.conclusion = this.vm.conclusion;
        return null;
    }

    protected onConfirmed(): any {
        if (this.conclusion === '弃权') {
            this.score = 0;
        }
        return {conclusion: this.conclusion, opinion: this.opinion, score: this.score, isCommit: this.isCommit};
    }

    commit() {
        this.isCommit = true;
        this.ok();
    }

    get errors(): boolean {
        return (this.score >= 60 && this.conclusion === '不同意')
        || (this.score < 60 && this.conclusion === '同意')
        || (this.score === undefined && this.conclusion !== '弃权');
    }
}
