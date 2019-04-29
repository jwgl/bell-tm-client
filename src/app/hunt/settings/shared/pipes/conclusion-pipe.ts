import { Pipe, PipeTransform } from '@angular/core';

import { Conclusion, conclusionLabels } from '../constants';

@Pipe({name: 'conclusion'})
export class ConclusionPipe implements PipeTransform {
    transform(value: Conclusion, arg: string) {
        if (!value) {
            return null;
        }
        if (arg === 'text') {
            return conclusionLabels[Conclusion[value]].text;
        } else if (arg === 'class') {
            return conclusionLabels[Conclusion[value]].class;
        }
    }
}
