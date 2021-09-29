import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { FacilityPricePipe } from './facility-price.pipe';
import { FacilitySubtotalPipe } from './facility-subtotal.pipe';
import { TimeUnitPipe } from './time-unit.pipe';
import { TimeValidator } from './time-validator';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FacilityPricePipe,
        FacilitySubtotalPipe,
        TimeUnitPipe,
        TimeValidator,
    ],
    exports: [
        FacilityPricePipe,
        FacilitySubtotalPipe,
        TimeUnitPipe,
        TimeValidator,
    ],
})
export class HuisSharedModule { }
