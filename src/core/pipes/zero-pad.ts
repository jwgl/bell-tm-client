import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'zeroPad' })
export class ZeroPadPipe implements PipeTransform {
    transform(data: number, size: number) {
        let s = String(data);
        while (s.length < (size || 2)) {
            s = '0' + s;
        }
        return s;
    }
}
