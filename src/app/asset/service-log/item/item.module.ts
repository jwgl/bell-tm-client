import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IconModule } from 'core/icon';
import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';


import { ServiceLogItemComponent } from './item.component';
import { ServiceLogFormViewerComponent } from '../shared/form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        WorkflowModule,
        IconModule,
    ],
    declarations: [
        ServiceLogItemComponent,
        ServiceLogFormViewerComponent,
    ],
    exports: [
        ServiceLogItemComponent,
        ServiceLogFormViewerComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class ServiceLogItemModule { }
