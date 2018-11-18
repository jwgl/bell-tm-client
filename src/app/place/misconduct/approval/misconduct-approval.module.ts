import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisconductApprovalRoutingModule } from './misconduct-approval.routing';
import { MisconductApprovalListModule } from './list/form-list.module';
import { MisconductApprovalItemModule } from './item/form-item.module';
import { MisconductApprovalComponent } from './misconduct-approval.component';
import { MisconductApprovalService } from './misconduct-approval.service';


@NgModule({
    imports: [
        CommonModule,
        MisconductApprovalRoutingModule,
        MisconductApprovalListModule,
        MisconductApprovalItemModule,
    ],
    declarations: [
        MisconductApprovalComponent,
    ],
    providers: [
        MisconductApprovalService,
        { provide: 'MISCONDUCT_APPROVAL_API_URL', useValue: '/api/place/approvers/${userId}/misconducts' },
        { provide: 'MISCONDUCT_PICTURE_API_URL', useValue: '/api/place/misconductPictures' },
    ],
})
export class MisconductApprovalModule { }
