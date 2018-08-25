import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReissueSharedModule } from '../../shared/reissue-shared.module';
import { ReissueFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueFormEditorComponent,
    ],
    exports: [
        ReissueFormEditorComponent,
    ],
})
export class ReissueFormEditorModule { }
