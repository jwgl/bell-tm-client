import { Pipe, PipeTransform } from '@angular/core';

import { auditStatusText } from '../utils/audit-status';

@Pipe({ name: 'statusText' })
export class AuditStatusTextPipe implements PipeTransform {
    transform(value: string) {
        return auditStatusText(value);
    }
}
