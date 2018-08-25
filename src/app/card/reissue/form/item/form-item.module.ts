import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { ReissueSharedModule } from '../../shared/reissue-shared.module';
import { ReissueFormItemComponent } from './form-item.component';
import { ReissueFormService } from '../reissue-form.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule.forSubmit(ReissueFormService),
        ReissueSharedModule,
    ],
    declarations: [
        ReissueFormItemComponent,
    ],
    exports: [
        ReissueFormItemComponent,
    ],
})
export class ReissueFormItemModule { }
