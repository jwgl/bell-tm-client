import {Component} from '@angular/core';

import {findGradeRange} from '../../../shared/utils';
import {VisionPublicService} from '../vision-public.service';
import { Reusable } from 'core/route';

/**
 * 培养方案列表。
 */
@Reusable()
@Component({
    styleUrls: ['public-list.component.scss'],
    templateUrl: 'public-list.component.html',
})
export class VisionPublicListComponent {
    departments: any;
    grades: number[];
    selectedGrade = 0;

    constructor(private service: VisionPublicService) {
        this.service.loadList().subscribe(dto => {
            this.departments = dto;
            this.grades = findGradeRange(dto);
        });
    }

    setSelectedGrade(grade: number) {
        this.selectedGrade = this.selectedGrade === grade ? 0 : grade;
    }
}
