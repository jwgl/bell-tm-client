import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAreaRoutingModule } from './user-area.routing';
import { UserAreaService } from './user-area.service';
import { UserAreaListModule } from './list/from-list.module';
import { UserAreaEditorModule } from './editor/form-editor.module';

@NgModule({
    imports: [
        CommonModule,
        UserAreaRoutingModule,
        UserAreaListModule,
        UserAreaEditorModule,
    ],
    providers: [
        UserAreaService,
        { provide: 'USER_API_URL', useValue: '/api/asset/approvers/${userId}/userAreas' },
    ],
})
export class UserAreaModule { }
