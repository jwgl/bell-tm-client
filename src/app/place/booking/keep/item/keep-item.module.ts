import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxUploaderModule } from 'ngx-uploader';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { BookingKeepItemComponent } from './keep-item.component';
import { MisconductEditorComponent } from './misconduct-editor.component';
import { MisconductViewerComponent } from './misconduct-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        NgxUploaderModule,
    ],
    declarations: [
        BookingKeepItemComponent,
        MisconductEditorComponent,
        MisconductViewerComponent,
    ],
    exports: [
        BookingKeepItemComponent,
    ],
})
export class BookingKeepItemModule { }
