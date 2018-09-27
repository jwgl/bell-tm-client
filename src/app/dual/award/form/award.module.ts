import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsAdministrateModule } from '../application/administrate/administrate.module';

import { AwardFormEditorModule } from './editor/form-editor.module';
import { AwardItemModule } from './item/item.module';
import { AwardFormListModule } from './list/form-list.module';
import { BatchRoutingModule } from './award-routing.module';
import { AwardFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        AwardFormEditorModule,
        AwardItemModule,
        AwardFormListModule,
        BatchRoutingModule,
        ApplicationsAdministrateModule,
    ],
    providers: [
        AwardFormService,
        { provide: 'AWARD_API_URL', useValue: '/api/dual/departments/${departmentId}/awards' },
    ],
})
export class AwardFormModule { }
