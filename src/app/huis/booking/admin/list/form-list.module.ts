import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { BookingAdminListComponent } from './form-list.component';
import { Workflow2Module } from 'core/workflow2';
import { IconModule } from 'core/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        IconModule,
        CommonDirectivesModule,
        Workflow2Module,
    ],
    declarations: [
        BookingAdminListComponent,
    ],
    exports: [
        BookingAdminListComponent,
    ],
})
export class BookingAdminListModule { }
