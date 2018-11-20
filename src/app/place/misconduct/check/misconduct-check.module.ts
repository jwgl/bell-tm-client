import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisconductCheckRoutingModule } from './misconduct-check.routing';
import { MisconductCheckListModule } from './list/form-list.module';
import { MisconductCheckItemModule } from './item/form-item.module';
import { MisconductCheckComponent } from './misconduct-check.component';
import { MisconductCheckService } from './misconduct-check.service';


@NgModule({
    imports: [
        CommonModule,
        MisconductCheckRoutingModule,
        MisconductCheckListModule,
        MisconductCheckItemModule,
    ],
    declarations: [
        MisconductCheckComponent,
    ],
    providers: [
        MisconductCheckService,
        { provide: 'MISCONDUCT_CHECK_API_URL', useValue: '/api/place/checkers/${userId}/misconducts' },
        { provide: 'MISCONDUCT_PICTURE_API_URL', useValue: '/api/place/misconductPictures' },
    ],
})
export class MisconductCheckModule { }
