import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { BookingFindPlaceModule } from './find-place/find-place.module';
import { BookingFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        BookingFindPlaceModule,
    ],
    declarations: [
        BookingFormEditorComponent,
    ],
    exports: [
        BookingFormEditorComponent,
    ],
})
export class BookingFormEditorModule { }
