import { Pipe } from '@angular/core';

import { auditStatusText } from '../utils/audit-status';

@Pipe({ name: 'statusText' })
export class AuditStatusTextPipe {
    transform(value: string) {
        return auditStatusText(value);
    }
}
