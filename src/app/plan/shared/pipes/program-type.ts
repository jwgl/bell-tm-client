import { Pipe, PipeTransform } from '@angular/core';

import { getProgramType } from '../utils/program-type';

@Pipe({ name: 'programType' })
export class ProgramTypePipe implements PipeTransform {
    transform(type: any, showPrimary: boolean) {
        if (showPrimary && type === 0) {
            return '主修';
        } else {
            return getProgramType(type);
        }
    }
}
