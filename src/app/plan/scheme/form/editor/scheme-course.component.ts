import { Component, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';

import { EditMode } from 'core/constants';

import { RecordStatus, SchemeCourse } from '../../shared/scheme.model';

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
    @Input('scheme-course')
    schemeCourse: SchemeCourse;

    @Input()
    editMode: EditMode;

    @Output()
    edit = new EventEmitter<SchemeCourse>();

    @Output()
    delete = new EventEmitter<SchemeCourse>();

    @Output()
    restore = new EventEmitter<SchemeCourse>();

    @HostBinding('class')
    get hostClass(): string {
        if (!this.schemeCourse.group.scheme.previousId) {
            return '';
        }

        const classes: string[] = [];
        if (this.editMode !== EditMode.Create && this.schemeCourse.prevStatus !== RecordStatus.None) {
            classes.push('Prev' + RecordStatus[this.schemeCourse.prevStatus]);
        }
        if (this.editMode !== EditMode.Create && this.schemeCourse.currStatus !== RecordStatus.None) {
            classes.push('Curr' + RecordStatus[this.schemeCourse.currStatus]);
        }
        return classes.join(' ');
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
