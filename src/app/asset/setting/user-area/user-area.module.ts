import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAreaRoutingModule } from './user-area.routing';
import { UserAreaService } from './user-area.service';
import { UserAreaListModule } from './list/from-list.module';

@NgModule({
    imports: [
        CommonModule,
        UserAreaRoutingModule,
        UserAreaListModule,
    ],
    providers: [
        UserAreaService,
        { provide: 'USER_API_URL', useValue: '/api/asset/approvers/${userId}/userAreas' },
    ],
})
export class UserAreaModule { }
