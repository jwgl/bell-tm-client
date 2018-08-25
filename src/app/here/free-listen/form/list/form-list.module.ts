import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { FreeListenFormListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        FreeListenFormListComponent,
    ],
    exports: [
        FreeListenFormListComponent,
    ],
})
export class FreeListenFormListModule { }
