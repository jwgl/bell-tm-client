import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterService } from './center.service';
import { CenterRoutingModule } from './center.routing';
import { CenterListModule } from './list/from-list.module';

@NgModule({
    imports: [
        CommonModule,
        CenterRoutingModule,
        CenterListModule,
    ],
    providers: [
        CenterService,
        { provide: 'CENTER_API_URL', useValue: '/api/asset/users/${userId}/centers' },
    ],
})
export class CenterModule { }
