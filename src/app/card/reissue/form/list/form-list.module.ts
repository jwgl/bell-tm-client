import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { ReissueFormListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ReissueFormListComponent,
    ],
    exports: [
        ReissueFormListComponent,
    ],
})
export class ReissueFormListModule { }
