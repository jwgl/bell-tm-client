import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { LegacyItemComponent } from './item/legacy-item.component';
import { LegacyRoutingModule } from './legacy-routing.module';
import { LegacyService } from './legacy.service';
import { LegacyListComponent } from './list/legacy-list.component';
import { ObservationLegacyViewerModule } from './shared/form-view.module';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LegacyRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PipesModule,
        IconModule,
        ObservationLegacyViewerModule,
    ],
    declarations: [
        LegacyListComponent,
        LegacyItemComponent,
    ],
    providers: [
        LegacyService,
        {provide: 'LEGACY_API_URL', useValue: '/api/steer/legacies'},
    ],
})
export class LegacyModule { }
