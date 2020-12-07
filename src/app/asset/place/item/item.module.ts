import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlaceFormViewerModule } from '../shared/form-viewer.module';
import { PlaceItemComponent } from './item.component';
import { PlaceUpdatetDialog } from './place-update.dialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        WorkflowModule,
        PlaceFormViewerModule,
    ],
    declarations: [
        PlaceItemComponent,
        PlaceUpdatetDialog,
    ],
    exports: [
        PlaceItemComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        PlaceUpdatetDialog,
    ],
})
export class PlaceItemModule { }
