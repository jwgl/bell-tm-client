import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { PlaceUsageRoutingModule } from './place-usage.routing';
import { PlaceUsageComponent } from './place-usage.component';
import { PlaceUsageService } from './place-usage.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        PlaceUsageRoutingModule,
    ],
    declarations: [
        PlaceUsageComponent,
    ],
    providers: [
        PlaceUsageService,
        { provide: 'PLACE_USAGE_API_URL', useValue: '/api/place/buildings' },
    ],
})
export class PlaceUsageModule { }
