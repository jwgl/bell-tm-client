import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';
import { IconModule } from 'core/icon';

import { UnsettledFacilityListComponent } from './unsettled-list.component';
import { HuisSharedModule } from 'app/huis/shared/huis-shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        IconModule,
        CommonDirectivesModule,
        Workflow2Module,
        HuisSharedModule
    ],
    declarations: [
        UnsettledFacilityListComponent,
    ],
    exports: [
        UnsettledFacilityListComponent,
    ],
})
export class UnsettledFacilityListModule { }
