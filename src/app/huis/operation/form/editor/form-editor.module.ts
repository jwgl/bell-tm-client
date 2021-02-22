import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { HuisSharedModule } from '../../../shared/huis-shared.module';
import { OperationSharedModule } from '../../shared/operation-shared.module';
import { OperationFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        Workflow2Module,
        OperationSharedModule,
        HuisSharedModule,
    ],
    declarations: [
        OperationFormEditorComponent,
    ],
    exports: [
        OperationFormEditorComponent,
    ],
})
export class OperationFormEditorModule { }
