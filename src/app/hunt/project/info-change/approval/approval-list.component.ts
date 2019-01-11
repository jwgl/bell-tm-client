import { Component } from '@angular/core';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class InfoChangeApprovalListComponent {
    reviewStatus(form: any): string {
        return form.dateReviewed ? '已签' : form.reviewer ? '待签' : '';
    }
}
