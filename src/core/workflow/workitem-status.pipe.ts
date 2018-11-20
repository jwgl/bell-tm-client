import { Pipe, PipeTransform } from '@angular/core';

import { workitemStatusText } from '../utils/audit-status';

@Pipe({ name: 'workitemStatusText' })
export class WorkitemStatusTextPipe implements PipeTransform {
    transform(value: string) {
        return workitemStatusText(value);
    }
}
