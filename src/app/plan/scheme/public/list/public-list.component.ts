import { Component } from '@angular/core';

import { findGradeRange } from '../../../shared/utils';
import { SchemePublicService } from '../scheme-public.service';
import { Reusable } from 'core/route';

/**
 * 教学计划列表控件。
 */
@Reusable()
@Component({
    styleUrls: ['public-list.component.scss'],
    templateUrl: 'public-list.component.html',
})
export class SchemePublicListComponent {
    departments: any;
    grades: number[];
    selectedGrade = 0;

    constructor(private service: SchemePublicService) {
        this.service.loadList().subscribe(dto => {
            this.departments = dto;
            this.grades = findGradeRange(dto);
        });
    }

    onGradeChange(grade: number) {
        this.selectedGrade = this.selectedGrade === grade ? 0 : grade;
    }
}
