import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { CheckerEditorModule } from '../editor/form-editor.module';

import { CheckerListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        CheckerEditorModule,
    ],
    declarations: [
        CheckerListComponent,
    ],
    exports: [
        CheckerListComponent,
    ],
})
export class TaskFormListModule { }
