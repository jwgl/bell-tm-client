import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DualdegreeAuditStatus, statusLabels } from './constant';

@Component({
    selector: 'tm-dualdegree-audit-status',
    styles: ['label { font-weight:initial; margin-bottom:0; }'],
    template: '<label class="badge" [ngClass]="class">{{text}}</label>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualdegreeAuditStatusComponent {
    @Input() status: DualdegreeAuditStatus;

    get class(): string {
        return statusLabels[DualdegreeAuditStatus[this.status]].class;
    }

    get text(): string {
        return statusLabels[DualdegreeAuditStatus[this.status]].text;
    }
}
