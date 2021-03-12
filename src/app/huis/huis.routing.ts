import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/bookingForms',
    loadChildren: () => import('./booking/form/booking-form.module').then(m => m.BookingFormModule),
},{
    path: 'users/:userId/bookingTasks',
    loadChildren: () => import('./booking/task/booking-task.module').then(m => m.BookingTaskModule),
},{
    path: 'users/:userId/operationForms',
    loadChildren: () => import('./operation/form/operation-form.module').then(m => m.OperationFormModule),
},{
    path: 'users/:userId/operationTasks',
    loadChildren: () => import('./operation/task/operation-task.module').then(m => m.OperationTaskModule),
},{
    path: 'users/:userId/statementForms',
    loadChildren: () => import('./statement/form/statement-form.module').then(m => m.StatementFormModule),
},{
    path: 'users/:userId/statementTasks',
    loadChildren: () => import('./statement/task/statement-task.module').then(m => m.StatementTaskModule),
},{
    path: 'users/:userId/publicRooms',
    loadChildren: () => import('./public/room/room.module').then(m => m.PublicRoomModule),
},{
    path: 'users/:userId/roomSchedules',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.RoomScheduleModule),
},{
    path: 'departments/:departmentId/rooms',
    loadChildren: () => import('./admin/room/room-setting.module').then(m => m.RoomSettingModule),
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class HuisRoutingModule { }
