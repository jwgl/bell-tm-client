import { Pipe, PipeTransform } from '@angular/core';
import { SectionRange, sectionRangeText } from '../utils/section-range';

@Pipe({ name: 'sectionRange' })
export class SectionRangePipe implements PipeTransform {
    transform(value: SectionRange) {
        return sectionRangeText(value);
    }
}
