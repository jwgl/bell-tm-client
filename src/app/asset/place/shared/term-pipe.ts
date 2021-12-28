import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'term'})
export class TermPipe implements PipeTransform {
    transform(value: number) {
        return value > 0 ? `${Math.floor(value / 10)}-${Math.floor(value / 10) + 1}-${value % 10}` : null;
    }
}
