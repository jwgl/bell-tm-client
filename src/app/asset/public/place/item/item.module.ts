import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IconModule } from 'core/icon';
import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlaceItemComponent } from './item.component';

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
        PlaceItemComponent,
    ],
    exports: [
        PlaceItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class PlaceItemModule { }
