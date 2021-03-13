import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';

import { BookingSharedModule } from '../../shared/booking-shared.module';
import { BookingAdminItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingAdminItemComponent,
    ],
    exports: [
        BookingAdminItemComponent,
    ],
})
export class BookingAdminItemModule { }
