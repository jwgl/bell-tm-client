import { Pipe, PipeTransform } from '@angular/core';

import { DualdegreeAuditStatus, statusLabels } from '../constant';

@Pipe({name: 'statusLabel'})
export class DualdegreeStatusPipe implements PipeTransform {
    transform(value: DualdegreeAuditStatus, arg: string) {
        if (arg === 'text') {
            return statusLabels[DualdegreeAuditStatus[value]].text;
        } else if (arg === 'class') {
            return statusLabels[DualdegreeAuditStatus[value]].class;
        }
    }
}
