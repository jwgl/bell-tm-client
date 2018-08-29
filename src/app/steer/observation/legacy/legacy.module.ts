import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { TypeTextPipe } from '../shared/pipes/observer-type';
import { PagerPipe } from '../shared/pipes/pager';
import { TermTextPipe } from '../shared/pipes/term';

import { LegacyItemComponent } from './item/legacy-item.component';
import { LegacyRoutingModule } from './legacy-routing.module';
import { LegacyService } from './legacy.service';
import { LegacyListComponent } from './list/legacy-list.component';
import { FormViewComponent } from './shared/form-view.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        LegacyRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        LegacyListComponent,
        LegacyItemComponent,
        FormViewComponent,
        TermTextPipe,
        TypeTextPipe,
        PagerPipe,
    ],
    providers: [
        LegacyService,
        {provide: 'LEGACY_API_URL', useValue: '/api/steer/legacies'},
    ],
})
export class LegacyModule { }
