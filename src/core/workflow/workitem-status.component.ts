import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';

import { auditStatusClass } from '../utils/audit-status';

@Component({
    selector: 'workitem-status',
    template: '{{status | workitemStatusText}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkitemStatusComponent {
    @Input() status: string;

    @HostBinding('class')
    get hostClass(): string {
        return `text-${auditStatusClass(this.status)}`;
    }
}
