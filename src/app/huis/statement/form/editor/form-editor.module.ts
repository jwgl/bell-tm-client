import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { HuisSharedModule } from '../../../shared/huis-shared.module';
import { StatementSharedModule } from '../../shared/statement-shared.module';
import { StatementFindItemModule } from './find-item/find-item.module';
import { StatementFormEditorComponent } from './form-editor.component';
import { Workflow2Module } from 'core/workflow2';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        Workflow2Module,
        HuisSharedModule,
        StatementSharedModule,
        StatementFindItemModule,
    ],
    declarations: [
        StatementFormEditorComponent,
    ],
    exports: [
        StatementFormEditorComponent,
    ],
})
export class StatementFormEditorModule { }
