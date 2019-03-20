import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PlaceSelectComponent } from './place-select.component';
import { DepartmentTeacherSelectComponent } from './department-teacher-select.component';
import { SelectOrOtherComponent } from './select-or-other.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        PlaceSelectComponent,
        DepartmentTeacherSelectComponent,
        SelectOrOtherComponent,
    ],
    exports: [
        PlaceSelectComponent,
        DepartmentTeacherSelectComponent,
        SelectOrOtherComponent,
    ],
})
export class ObservationCommonModule { }
