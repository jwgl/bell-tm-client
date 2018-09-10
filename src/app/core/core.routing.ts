import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/profile',
    loadChildren: './user/profile/user-profile.module#UserProfileModule',
}, {
    path: 'users/:userId/password',
    loadChildren: './user/password/user-password.module#UserPasswordModule',
}, {
    path: 'students/:userId/schedules',
    loadChildren: './user/student-timetable/student-timetable.module#StudentTimetableModule',
}, {
    path: 'users/:userId/works',
    loadChildren: './user/todo/todo.module#TodoModule',
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class CoreRoutingModule { }
