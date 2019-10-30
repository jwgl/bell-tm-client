import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../../../settings/shared/common-pipes';

import { FormViewerComponent } from './form-viewer.component';
import { InfoChangeSimpleViewerComponent } from './info-change-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        FormViewerComponent,
        InfoChangeSimpleViewerComponent,
    ],
    exports: [
        FormViewerComponent,
        InfoChangeSimpleViewerComponent,
    ],
})
export class ProjectFormViewerModule {}
