import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/bookings',
    loadChildren: './booking/form/booking-form.module#BookingFormModule',
}, {
    path: 'checkers/:userId/bookings',
    loadChildren: './booking/check/booking-check.module#BookingCheckModule',
}, {
    path: 'approvers/:userId/bookings',
    loadChildren: './booking/approval/booking-approval.module#BookingApprovalModule',
}, {
    path: 'bookingReports',
    loadChildren: './booking/report/booking-report.module#BookingReportModule',
}, {
    path: 'keepers/:userId/bookings',
    loadChildren: './booking/keep/booking-keep.module#BookingKeepModule',
}, {
    path: 'approvers/:userId/misconducts',
    loadChildren: './misconduct/approval/misconduct-approval.module#MisconductApprovalModule',
}, {
    path: 'settings/bookingAuths',
    loadChildren: './settings/booking-auth/booking-auth.module#BookingAuthModule',
}, {
    path: 'usages',
    loadChildren: './usages/place-usage.module#PlaceUsageModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class PlaceRoutingModule { }
