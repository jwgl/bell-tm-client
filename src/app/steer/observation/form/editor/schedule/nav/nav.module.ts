import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { NavComponent } from './nav.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        NavComponent,
    ],
    exports: [
        NavComponent,
    ],
})
export class NavModule { }
