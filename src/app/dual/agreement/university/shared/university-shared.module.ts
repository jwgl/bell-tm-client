import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { UniversityFormViewerComponent } from './form-viewer.component';
@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FormsModule,
    ],
    declarations: [
        UniversityFormViewerComponent,
    ],
    exports: [
        UniversityFormViewerComponent,
    ],
})
export class UniversitySharedModule { }
