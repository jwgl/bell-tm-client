import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlaceFormViewerModule } from '../shared/form-viewer.module';
import { PlaceItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        PlaceFormViewerModule,
    ],
    declarations: [
        PlaceItemComponent,
    ],
    exports: [
        PlaceItemComponent,
    ],
})
export class PlaceItemModule { }
