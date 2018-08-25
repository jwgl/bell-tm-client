import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemePublicRoutingModule } from './scheme-public.routing';
import { SchemePublicListModule } from './list/public-list.module';
import { SchemePublicItemModule } from './item/public-item.module';
import { SchemePublicService } from './scheme-public.service';

@NgModule({
    imports: [
        CommonModule,
        SchemePublicRoutingModule,
        SchemePublicListModule,
        SchemePublicItemModule,
    ],
    providers: [
        SchemePublicService,
        { provide: 'SCHEME_PUBLIC_API_URL', useValue: '/api/plan/schemes' },
    ],
})
export class SchemePublicModule { }
