import { Pipe, PipeTransform } from '@angular/core';

import { oddEvenText } from '../utils/odd-even';

@Pipe({ name: 'oddEven' })
export class OddEvenPipe implements PipeTransform {
    transform(data: number) {
        return oddEvenText(data);
    }
}
