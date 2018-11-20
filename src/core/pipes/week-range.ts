import { Pipe, PipeTransform } from '@angular/core';

import { WeekRange, weekRangeText } from 'core/utils';

@Pipe({ name: 'weekRange' })
export class WeekRangePipe implements PipeTransform {
    transform(value: WeekRange) {
        return weekRangeText(value);
    }
}
