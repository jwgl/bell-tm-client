import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path: 'users/:userId/profile',
    loadChildren: () => import('./user/profile/user-profile.module').then(m => m.UserProfileModule),
}, {
    path: 'users/:userId/password',
    loadChildren: () => import('./user/password/user-password.module').then(m => m.UserPasswordModule),
}, {
    path: 'students/:userId/schedules',
    loadChildren: () => import('./user/student-timetable/student-timetable.module').then(m => m.StudentTimetableModule),
}, {
    path: 'users/:userId/works',
    loadChildren: () => import('./user/todo/todo.module').then(m => m.TodoModule),
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
