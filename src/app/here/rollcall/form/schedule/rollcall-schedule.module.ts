import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { RollcallScheduleComponent } from './rollcall-schedule.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        RollcallScheduleComponent,
    ],
    exports: [
        RollcallScheduleComponent,
    ],
})
export class RollcallScheduleModule { }
