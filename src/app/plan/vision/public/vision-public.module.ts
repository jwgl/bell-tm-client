import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisionPublicRoutingModule } from './vision-public.routing';
import { VisionPublicListModule } from './list/public-list.module';
import { VisionPublicItemModule } from './item/public-item.module';
import { VisionPublicService } from './vision-public.service';

@NgModule({
    imports: [
        CommonModule,
        VisionPublicRoutingModule,
        VisionPublicListModule,
        VisionPublicItemModule,
    ],
    providers: [
        VisionPublicService,
        { provide: 'VISION_PUBLIC_API_URL', useValue: '/api/plan/visions' },
        { provide: 'SCHEMES_PUBLIC_WEB_URL', useValue: '/plan/schemes' },
    ],
})
export class VisionPublicModule { }
