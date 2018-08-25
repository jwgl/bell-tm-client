import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlanSharedModule } from '../../../shared/module';
import { SchemePublicListComponent } from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanSharedModule,
    ],
    declarations: [
        SchemePublicListComponent,
    ],
    exports: [
        SchemePublicListComponent,
    ],
})
export class SchemePublicListModule { }
