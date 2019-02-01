import { Pipe, PipeTransform } from '@angular/core';

import { ProjectStatus, projectStatusLabels } from '../constants';

@Pipe({name: 'projectStatus'})
export class ProjectStatusPipe implements PipeTransform {
    transform(value: ProjectStatus, arg: string) {
        if (arg === 'text') {
            return projectStatusLabels[ProjectStatus[value]].text;
        } else if (arg === 'class') {
            return projectStatusLabels[ProjectStatus[value]].class;
        }
    }
}
