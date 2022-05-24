import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { ServiceLogFormComponent } from './form-editor.component';
import { ObservationCommonModule } from 'app/steer/observation/common/observation-common.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        ObservationCommonModule,

    ],
    declarations: [
        ServiceLogFormComponent,
    ],
    exports: [
        ServiceLogFormComponent,
    ],
})
export class ServiceLogFormEditorModule { }
