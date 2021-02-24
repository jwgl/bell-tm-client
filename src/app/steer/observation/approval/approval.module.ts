import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { ObservationFormViewerModule } from '../form/shared/form-viewer.module';
import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalService } from './approval.service';
import { ApprovalItemComponent } from './item/approval-item.component';
import { ApprovalListComponent } from './list/approval-list.component';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ApprovalRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PipesModule,
        IconModule,
        ObservationFormViewerModule,
    ],
    declarations: [
        ApprovalListComponent,
        ApprovalItemComponent,
    ],
    providers: [
        ApprovalService,
        {provide: 'APPROVAL_API_URL', useValue: '/api/steer/approvers/${userId}/observations' },
    ],
})
export class ApprovalModule { }
