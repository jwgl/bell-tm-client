import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { TimeUnitPipe } from './time-unit.pipe';
import { TimeValidator } from './time-validator';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        TimeUnitPipe,
        TimeValidator,
    ],
    exports: [
        TimeUnitPipe,
        TimeValidator,
    ],
})
export class HuisSharedModule { }
