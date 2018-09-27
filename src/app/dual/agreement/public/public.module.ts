import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { AgreementSharedModule } from '../shared/agreement-shared.module';

import { AgreementItemModule } from './item/item.module';
import { AgreementFormListModule } from './list/form-list.module';
import { AgreementRoutingModule } from './public-routing.module';
import { AgreementPublicService } from './public.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        AgreementRoutingModule,
        AgreementSharedModule,
        AgreementItemModule,
        AgreementFormListModule,
    ],
    providers: [
        AgreementPublicService,
        { provide: 'PUBLIC_API_URL', useValue: '/api/dual/agreements' },
    ],
})
export class PublicModule { }
