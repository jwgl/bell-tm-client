import { Pipe, PipeTransform } from '@angular/core';

import { Level, levelLabels } from '../constants';

@Pipe({name: 'level'})
export class LevelPipe implements PipeTransform {
    transform(value: Level, arg: string) {
        if (arg === 'text') {
            return levelLabels[Level[value]].text;
        } else if (arg === 'class') {
            return levelLabels[Level[value]].class;
        }
    }
}
