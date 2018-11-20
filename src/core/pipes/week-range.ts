import { Pipe } from '@angular/core';

import { WeekRange, weekRangeText } from 'core/utils';

@Pipe({ name: 'weekRange' })
export class WeekRangePipe {
    transform(value: WeekRange) {
        return weekRangeText(value);
    }
}
