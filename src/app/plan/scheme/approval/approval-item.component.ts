import { Component } from '@angular/core';

import { Scheme } from '../shared/scheme.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class SchemeApprovalItemComponent {
    form: Scheme;
    showDiff = true;

    onItemLoaded(dto: any) {
        this.form = new Scheme(dto.form);
    }
}
