import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PlaceSelectComponent } from './place-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        PlaceSelectComponent,
    ],
    exports: [
        PlaceSelectComponent,
    ],
})
export class PlaceSelectModule { }
