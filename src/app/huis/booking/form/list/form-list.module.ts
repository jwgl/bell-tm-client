import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { BookingFormListComponent } from './form-list.component';
import { Workflow2Module } from 'core/workflow2';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        Workflow2Module,
    ],
    declarations: [
        BookingFormListComponent,
    ],
    exports: [
        BookingFormListComponent,
    ],
})
export class BookingFormListModule { }
