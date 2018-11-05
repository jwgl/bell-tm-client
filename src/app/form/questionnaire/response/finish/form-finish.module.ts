import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResponseFormFinishComponent } from './form-finish.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        ResponseFormFinishComponent,
    ],
    exports: [
        ResponseFormFinishComponent,
    ],
})
export class ResponseFormFinishModule { }
