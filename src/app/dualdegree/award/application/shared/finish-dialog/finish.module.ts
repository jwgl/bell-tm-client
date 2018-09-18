import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { WorkflowFinishDialog } from './finish.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        WorkflowFinishDialog,
    ],
    entryComponents: [
        WorkflowFinishDialog,
    ],
})
export class WorkFlowFinishModule {}
