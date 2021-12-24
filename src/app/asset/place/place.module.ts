import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceRoutingModule } from './place.routing';
import { PlaceListModule } from './list/from-list.module';
import { PlaceFormEditorModule } from './editor/form-editor.module';
import { PlaceItemModule } from './item/item.module';
import { RoomFormService } from './form.service';
import { PlanService } from './plan.service';
import { PlanEditorModule } from './plan/editor/plan-editor.module';
import { PlanListModule } from './plan/list/plan-list.module';
import { PlanItemModule } from './plan/item/item.module';

@NgModule({
    imports: [
        CommonModule,
        PlaceRoutingModule,
        PlaceListModule,
        PlaceFormEditorModule,
        PlaceItemModule,
        PlanEditorModule,
        PlanListModule,
        PlanItemModule,
    ],
    providers: [
        RoomFormService,
        PlanService,
        { provide: 'ROOM_API_URL', useValue: '/api/asset/users/${userId}/places' },
        { provide: 'LABEL_API_URL', useValue: '/api/asset/users/${userId}/labelAdmins' },
        { provide: 'LABELLING_API_URL', useValue: '/api/asset/users/${userId}/labellings' },
        { provide: 'PLAN_API_URL', useValue: '/api/asset/users/${userId}/plans' },
        { provide: 'HINDFIELD_API_URL', useValue: '/api/asset/users/${userId}/hindFields' },
    ],
})
export class PlaceModule { }
