import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
import { MarkdownDirective } from './directives/markdown';
import { Spinning } from './directives/spinning';
import { ActionClassPipe, ActionNamePipe } from './pipes/audit-action';
import { AuditStatusTextPipe } from './pipes/audit-status';
import { DayOfWeekPipe } from './pipes/day-of-week';
import { FilterByPipe } from './pipes/filter-by';
import { GroupByPipe } from './pipes/group-by';
import { MarkdownPipe } from './pipes/markdown';
import { WeekRangePipe } from './pipes/week-range';
import { OddEvenPipe } from './pipes/odd-even';
import { SectionRangePipe } from './pipes/section-range';
import { TermNamePipe } from './pipes/term-name';
import { UniqueByPipe } from './pipes/unique-by';
import { ZeroPadPipe } from './pipes/zero-pad';
import { NilValuePipe } from './pipes/nil-value';

import { ScheduleTimetableComponent } from './components/schedule-timetable/schedule-timetable.component';
import { ScheduleWeektabComponent } from './components/schedule-timetable/schedule-weektab.component';
import { TeacherSelectComponent } from './components/teacher-select/teacher-select.component';

import { ProvideParentForm } from './directives/provide-parent-form';
import { MultipleLineComponent } from './components/multiple-line.component';
import { IconModule } from './icon';
import { DeleteItemComponent } from './components/delete-item';
import { AddItemComponent } from './components/add-item';
import { LinkPagerComponent } from './components/link-pager';

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
    LinkPagerComponent,
    RemoveItemComponent,
    AddItemComponent,
    DeleteItemComponent,
    ScheduleTimetableComponent,
    ScheduleWeektabComponent,
    TeacherSelectComponent,
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
    MarkdownDirective,
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
    WeekRangePipe,
    OddEvenPipe,
    SectionRangePipe,
    TermNamePipe,
    AuditStatusTextPipe,
    UniqueByPipe,
    NilValuePipe,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        IconModule,
    ],
    declarations: [
        CORE_DIRECTIVES,
    ],
    exports: [
        CORE_DIRECTIVES,
    ],
})
export class CommonDirectivesModule { }
