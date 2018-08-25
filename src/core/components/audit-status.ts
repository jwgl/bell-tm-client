import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

import { auditStatusClass } from '../utils/audit-status';

@Component({
    selector: 'audit-status',
    template: '{{status | statusText}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditStatusComponent {
    @Input() status: string;

    @HostBinding('class')
    get hostClass(): string {
        return `badge badge-${auditStatusClass(this.status)}`;
    }
}
