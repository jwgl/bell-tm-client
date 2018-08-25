import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { BookingAuthRoutingModule } from './booking-auth.routing';
import { BookingAuthComponent } from './booking-auth.component';
import { BookingAuthDialog } from './booking-auth.dialog';
import { BookingAuthService } from './booking-auth.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        BookingAuthRoutingModule,
    ],
    declarations: [
        BookingAuthComponent,
        BookingAuthDialog,
    ],
    providers: [
        BookingAuthService,
        { provide: 'BOOKING_AUTH_API_URL', useValue: '/api/place/settings/bookingAuths' },
        { provide: 'DEPARTMENT_TEACHERS_API_URL', useValue: '/api/place/departments/${departmentId}/teachers' },
    ],
    entryComponents: [
        BookingAuthDialog,
    ],
})
export class BookingAuthModule { }
