import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacePubicRoutingModule } from './place.routing';
import { PlaceListModule } from './list/from-list.module';
import { PlaceItemModule } from './item/item.module';
import { LabelListModule } from './label/label-list.module';
import { RoomFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        PlacePubicRoutingModule,
        PlaceListModule,
        PlaceItemModule,
        LabelListModule,
    ],
    providers: [
        RoomFormService,
        { provide: 'ROOM_API_URL', useValue: '/api/asset/users/${userId}/placePublics' },
    ],
})
export class PlacePublicModule { }
