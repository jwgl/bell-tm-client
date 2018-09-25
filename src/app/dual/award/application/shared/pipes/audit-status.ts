import { Pipe, PipeTransform } from '@angular/core';

import { DualAuditStatus, statusLabels } from '../constant';

@Pipe({name: 'statusLabel'})
export class DualStatusPipe implements PipeTransform {
    transform(value: DualAuditStatus, arg: string) {
        if (arg === 'text') {
            return statusLabels[DualAuditStatus[value]].text;
        } else if (arg === 'class') {
            return statusLabels[DualAuditStatus[value]].class;
        }
    }
}
