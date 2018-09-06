import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({ name: 'pager' })
export class PagerPipe implements PipeTransform {
    transform(data: any[], args: any) {
        return  _.slice(data, args.offs, args.offs + args.max);
    }
}
