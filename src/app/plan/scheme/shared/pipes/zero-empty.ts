import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zeroEmpty' })
export class ZeroEmptyPipe implements PipeTransform {
    transform(value: number) {
        return value === 0 ? null : value;
    }
}
