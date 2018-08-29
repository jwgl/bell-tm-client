import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { ObservationFormViewerComponent } from '../form/shared/form-viewer.component';
import { TypeTextPipe } from '../shared/pipes/observer-type';
import { StatusTextPipe } from '../shared/pipes/status';
import { TermTextPipe } from '../shared/pipes/term';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';
import { ApprovalService } from './approval.service';
import {NavTabsComponent} from './common/nav-tabs.component';
import { ApprovalItemComponent } from './item/approval-item.component';
import { ApprovalListComponent } from './list/approval-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ApprovalRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        ApprovalListComponent,
        ApprovalComponent,
        TermTextPipe,
        StatusTextPipe,
        ObservationFormViewerComponent,
        ApprovalItemComponent,
        NavTabsComponent,
        TypeTextPipe,
    ],
    providers: [
        ApprovalService,
        {provide: 'APPROVAL_API_URL', useValue: '/api/steer/approvers/${userId}/observations' },
    ],
})
export class ApprovalModule { }
