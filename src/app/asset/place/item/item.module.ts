import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxUploaderModule } from 'ngx-uploader';

import { IconModule } from 'core/icon';
import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlaceFormViewerModule } from '../shared/form-viewer.module';
import { PlaceItemComponent } from './item.component';
import { PlaceUpdatetDialog } from './place-update.dialog';
import { LabelComponent } from './label.component';
import { LabellingComponent } from './labelling.component';
import { PictureEditorComponent } from './picture/picture-editor.component';
import { PictureViewerComponent } from './picture/picture-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        WorkflowModule,
        PlaceFormViewerModule,
        IconModule,
        NgxUploaderModule,
    ],
    declarations: [
        PlaceItemComponent,
        PlaceUpdatetDialog,
        LabelComponent,
        LabellingComponent,
        PictureEditorComponent,
        PictureViewerComponent,
    ],
    exports: [
        PlaceItemComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        PlaceUpdatetDialog,
        LabelComponent,
        LabellingComponent,
    ],
})
export class PlaceItemModule { }
