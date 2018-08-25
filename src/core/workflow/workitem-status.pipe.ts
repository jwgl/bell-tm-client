import { Pipe } from '@angular/core';

import { workitemStatusText } from '../utils/audit-status';

@Pipe({ name: 'workitemStatusText' })
export class WorkitemStatusTextPipe {
    transform(value: string) {
        return workitemStatusText(value);
    }
}
