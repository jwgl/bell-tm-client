import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoolcallFormEditorModule } from './editor/rollcall-editor.module';
import { RollcallFormRoutingModule } from './rollcall-form.routing';
import { RollcallFormComponent } from './rollcall-form.component';
import { RollcallFormService } from './rollcall-form.service';
import { RollcallScheduleModule } from './schedule/rollcall-schedule.module';

@NgModule({
    declarations: [
        RollcallFormComponent,
    ],
    imports: [
        CommonModule,
        RollcallFormRoutingModule,
        RollcallScheduleModule,
        RoolcallFormEditorModule,
    ],
    providers: [
        RollcallFormService,
        { provide: 'ROLLCALL_API_URL', useValue: '/api/here/teachers/${userId}/timeslots' },
    ],
})
export class RollcallFormModule { }
