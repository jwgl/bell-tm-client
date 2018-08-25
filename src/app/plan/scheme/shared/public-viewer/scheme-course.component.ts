import { Component, Input } from '@angular/core';

import { AbstractGroup, SchemeCourse } from '../scheme.model';

/**
 * 课程。
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[scheme-course]',
    templateUrl: 'scheme-course.component.html',
})
export class SchemeCourseComponent {
    @Input('scheme-course') schemeCourse: SchemeCourse;

    /**
     * 1级分组
     */
    @Input() group1: AbstractGroup;
    @Input() first1: boolean;

    /**
     * 2级分组
     */
    @Input() group2: AbstractGroup;
    @Input() first2: boolean;
}
