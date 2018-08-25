import { Component, Input, HostBinding, HostListener } from '@angular/core';

import { RecordStatus, SchemeCourse } from '../scheme.model';

/**
 * 课程
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[scheme-course]',
    styleUrls: ['scheme-course.component.scss'],
    templateUrl: 'scheme-course.component.html',
})
export class SchemeCourseComponent {
    @Input('scheme-course') schemeCourse: SchemeCourse;

    @HostBinding('class')
    get statusClass(): string {
        if (!this.schemeCourse.group.scheme.previousId || this.schemeCourse.prevStatus === RecordStatus.None) {
            return '';
        } else {
            return RecordStatus[this.schemeCourse.prevStatus];
        }
    }

    @HostBinding('class.highlight')
    get hostHighlight(): boolean {
        return this.schemeCourse.highlight;
    }

    @HostListener('mouseenter')
    mouseenter() {
        if (this.schemeCourse.ref) {
            this.schemeCourse.ref.highlight = true;
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        if (this.schemeCourse.ref) {
            this.schemeCourse.ref.highlight = false;
        }
    }
}
