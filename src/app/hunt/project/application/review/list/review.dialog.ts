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

    protected onOpening(): Observable<any> {
        this.vm = this.options.reviewInfo;
        this.opinion = this.vm.opinion;
        this.conclusion = this.vm.conclusion;
        return null;
    }

    protected onConfirmed(): any {
        return {conclusion: this.conclusion, opinion: this.opinion};
    }
}
