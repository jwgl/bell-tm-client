import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementCarryoutModule } from './carryout/carryout.module';
import { AgreementFormEditorModule } from './editor/form-editor.module';
import { AgreementRoutingModule } from './form-routing.module';
import { AgreementFormService } from './form.service';
import { AgreementItemModule } from './item/item.module';
import { AgreementFormListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        AgreementFormEditorModule,
        AgreementRoutingModule,
        AgreementItemModule,
        AgreementFormListModule,
        AgreementCarryoutModule,
    ],
    providers: [
        AgreementFormService,
        {provide: 'AGREEMENT_FORM_API_URL', useValue: '/api/dualdegree/users/${userId}/agreements' },
        {provide: 'AGREEMENT_CARRYOUT_API_URL', useValue: '/api/dualdegree/users/${userId}/carryout' },
    ],
})
export class AgreementFormModule { }
