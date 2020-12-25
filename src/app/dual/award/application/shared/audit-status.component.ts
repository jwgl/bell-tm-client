import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DualAuditStatus, statusLabels } from './constant';

@Component({
    selector: 'tm-dual-audit-status',
    styles: ['label { font-weight:initial; margin-bottom:0; }'],
    template: '<label class="badge" [ngClass]="class">{{text}}</label>',
    // 告诉Angular该组件仅仅依赖于它的@inputs()，目的是提高性能
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualAuditStatusComponent {
    @Input() status: DualAuditStatus;

    get class(): string {
        return statusLabels[DualAuditStatus[this.status]].class;
    }

    get text(): string {
        return statusLabels[DualAuditStatus[this.status]].text;
    }
}
