import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { ObservationFormViewerModule } from '../form/shared/form-viewer.module';
import { FormViewComponent } from '../legacy/shared/form-view.component';
import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { LegacyItemComponent } from './item/legacy-item.component';
import { PublicItemComponent } from './item/public-item.component';
import { PublicListComponent } from './list/public-list.component';

import { PublicRoutingModule } from './public-routing.module';
import { PublicService } from './public.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PublicRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PipesModule,
        ObservationFormViewerModule,
    ],
    declarations: [
        PublicListComponent,
        PublicItemComponent,
        LegacyItemComponent,
        FormViewComponent,
    ],
    providers: [
        PublicService,
        {provide: 'PUBLIC_API_URL', useValue: '/api/steer/publics'},
    ],
})
export class PublicModule { }
