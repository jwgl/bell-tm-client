import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { ReissueFormNoticeComponent } from './form-notice.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ReissueFormNoticeComponent,
    ],
    exports: [
        ReissueFormNoticeComponent,
    ],
})
export class ReissueFormNoticeModule { }
