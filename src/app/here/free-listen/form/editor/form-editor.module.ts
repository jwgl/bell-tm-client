import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { FreeListenFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FreeListenFormEditorComponent,
    ],
    exports: [
        FreeListenFormEditorComponent,
    ],
})
export class FreeListenFormEditorModule { }
