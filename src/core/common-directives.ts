import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlDirective } from './bootstrap/form-control.directive';
import {
    FormField2Component,
    FormFieldLeftDirective,
    FormFieldRightDirective,
} from './bootstrap/form-field-2.component';
import { FormFieldComponent } from './bootstrap/form-field.component';
import { FormDirective } from './bootstrap/form.directive';
import {
    ModalBodyDirective,
    ModalCancelButtonDirective,
    ModalDialogComponent,
    ModalFooterDirective,
    ModalOkButtonDirective,
} from './bootstrap/modal-dialog.directive';
import { AuditStatusComponent } from './components/audit-status';
import { CheckboxSelectorComponent } from './components/checkbox-selector';
import { RowExpenderComponent } from './components/row-expender';
import { FormTitleComponent } from './components/form-title';
import { FromNowComponent } from './components/from-now';
import { PagerComponent } from './components/pager';
import { RemoveItemComponent } from './components/remove-item';
import { Markdown } from './directives/markdown';
import { Spinning } from './directives/spinning';
import { ActionClassPipe, ActionNamePipe } from './pipes/audit-action';
import { AuditStatusTextPipe } from './pipes/audit-status';
import { DayOfWeekPipe } from './pipes/day-of-week';
import { FilterByPipe } from './pipes/filter-by';
import { GroupByPipe } from './pipes/group-by';
import { MarkdownPipe } from './pipes/markdown';
import { OddEvenPipe } from './pipes/odd-even';
import { SectionRangePipe } from './pipes/section-range';
import { TermNamePipe } from './pipes/term-name';
import { UniqueByPipe } from './pipes/unique-by';
import { ZeroPadPipe } from './pipes/zero-pad';

import { ScheduleTimetableComponent } from './components/schedule-timetable/schedule-timetable.component';
import { ScheduleWeektabComponent } from './components/schedule-timetable/schedule-weektab.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSpinner, faTimes, faPlus, faTrashAlt, faEdit,
    faArrowUp, faArrowDown, faAngleUp, faAngleDown,
    faTag, faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import {
    faMinusSquare, faPlusSquare,
    faThumbsUp, faThumbsDown,
} from '@fortawesome/free-regular-svg-icons';
import { ProvideParentForm } from './directives/provide-parent-form';
import { MultipleLineComponent } from './components/multiple-line.component';

library.add(
    faSpinner, faTimes, faPlus, faTrashAlt, faEdit,
    faArrowUp, faArrowDown, faAngleUp, faAngleDown,
    faTag, faHashtag,
    faThumbsUp, faThumbsDown,
    faMinusSquare, faPlusSquare,
);

export {
    CheckboxSelectorComponent,
};

const CORE_DIRECTIVES: any[] = [
    // common commponent
    AuditStatusComponent,
    CheckboxSelectorComponent,
    RowExpenderComponent,
    FormTitleComponent,
    FromNowComponent,
    PagerComponent,
    RemoveItemComponent,
    ScheduleTimetableComponent,
    ScheduleWeektabComponent,
    MultipleLineComponent,
    // bootstrap form directives
    FormDirective,
    FormControlDirective,
    FormFieldComponent,
    FormField2Component,
    FormFieldLeftDirective,
    FormFieldRightDirective,
    // bootstrap modal directives
    ModalDialogComponent,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
    ModalBodyDirective,
    ModalFooterDirective,
    // other directives
    Markdown,
    Spinning,
    ProvideParentForm,
    // pipes
    GroupByPipe,
    FilterByPipe,
    ZeroPadPipe,
    DayOfWeekPipe,
    ActionNamePipe,
    ActionClassPipe,
    MarkdownPipe,
    OddEvenPipe,
    SectionRangePipe,
    TermNamePipe,
    AuditStatusTextPipe,
    UniqueByPipe,
];

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
    ],
    declarations: [
        CORE_DIRECTIVES,
    ],
    exports: [
        CORE_DIRECTIVES,
    ],
})
export class CommonDirectivesModule { }
