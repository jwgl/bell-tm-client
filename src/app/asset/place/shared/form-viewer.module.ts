import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';
import { StatusPipe } from './room-status-pipe';
import { PlanStatusPipe } from './plan-status-pipe';
import { ActionPipe } from './plan-action-pipe';
import { TermPipe } from './term-pipe';
import { PlaceFormViewerComponent } from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        PlaceFormViewerComponent,
        StatusPipe,
        PlanStatusPipe,
        ActionPipe,
        TermPipe,
    ],
    exports: [
        PlaceFormViewerComponent,
        StatusPipe,
        PlanStatusPipe,
        ActionPipe,
        TermPipe,
    ],
})
export class PlaceFormViewerModule { }
