import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceRoutingModule } from './place.routing';
import { PlaceListModule } from './list/from-list.module';
import { PlaceFormEditorModule } from './editor/form-editor.module';
import { RoomFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        PlaceRoutingModule,
        PlaceListModule,
        PlaceFormEditorModule,
    ],
    providers: [
        RoomFormService,
        { provide: 'ROOM_API_URL', useValue: '/api/asset/users/${userId}/places' },
    ],
})
export class PlaceModule { }
