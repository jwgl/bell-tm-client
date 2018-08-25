import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

import {TimeslotItem, Timetable} from 'core/models';
import {FreeListenForm, FreeListenSettings} from './free-listen-form.model';

@Component({
    selector: 'tm-free-listen-form-viewer',
    styleUrls: ['free-listen-form-viewer.component.scss'],
    templateUrl: 'free-listen-form-viewer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreeFormViewerComponent {
    @Input() form: FreeListenForm;
    @Input() timetable: Timetable;
    @Input() settings: FreeListenSettings;

    mouseenter(item: TimeslotItem) {
        this.timetable.getTimeslots(0).forEach(timeslot => {
            timeslot.items.filter(it => it.schedules.some(schedule => {
                return item.schedules.some(s => s.courseClassId === schedule.courseClassId);
            })).forEach(it => it.highlight = true);
        });
    }

    mouseleave(item: TimeslotItem) {
        this.timetable.getTimeslots(0).forEach(timeslot => {
            timeslot.items.forEach(it => it.highlight = false);
        });
    }
}
