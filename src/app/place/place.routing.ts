import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/bookings',
    loadChildren: () => import('./booking/form/booking-form.module').then(m => m.BookingFormModule),
}, {
    path: 'checkers/:userId/bookings',
    loadChildren: () => import('./booking/check/booking-check.module').then(m => m.BookingCheckModule),
}, {
    path: 'approvers/:userId/bookings',
    loadChildren: () => import('./booking/approval/booking-approval.module').then(m => m.BookingApprovalModule),
}, {
    path: 'bookingReports',
    loadChildren: () => import('./booking/report/booking-report.module').then(m => m.BookingReportModule),
}, {
    path: 'keepers/:userId/bookings',
    loadChildren: () => import('./booking/keep/booking-keep.module').then(m => m.BookingKeepModule),
}, {
    path: 'checkers/:userId/misconducts',
    loadChildren: () => import('./misconduct/check/misconduct-check.module').then(m => m.MisconductCheckModule),
}, {
    path: 'approvers/:userId/misconducts',
    loadChildren: () => import('./misconduct/approval/misconduct-approval.module').then(m => m.MisconductApprovalModule),
}, {
    path: 'settings/bookingAuths',
    loadChildren: () => import('./settings/booking-auth/booking-auth.module').then(m => m.BookingAuthModule),
}, {
    path: 'usages',
    loadChildren: () => import('./usages/place-usage.module').then(m => m.PlaceUsageModule),
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
