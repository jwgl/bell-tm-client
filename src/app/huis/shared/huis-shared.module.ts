import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { TimeUnitPipe } from './time-unit.pipe';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        TimeUnitPipe,
    ],
    exports: [
        TimeUnitPipe,
    ],
})
export class HuisSharedModule { }
