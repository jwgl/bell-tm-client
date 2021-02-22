import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeUnit' })
export class TimeUnitPipe implements PipeTransform {
    transform(timeUnit: number): string {
        switch (timeUnit) {
            case 1: return '小时';
            case 4: return '单元';
        }
    }
}
