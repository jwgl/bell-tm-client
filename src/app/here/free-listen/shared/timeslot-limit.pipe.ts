import { Pipe, PipeTransform } from '@angular/core';

import { TimeslotItem } from 'core/models';

@Pipe({ name: 'timeslotLimit' })
export class TimeslotLimitPipe implements PipeTransform {
    transform(items: TimeslotItem[], limit: number) {
        if (items.length <= limit) {
            return items;
        } else {
            return items.slice(0, limit);
        }
    }
}
