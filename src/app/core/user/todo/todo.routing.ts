import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from './todo-list.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'open',
    pathMatch: 'full',
}, {
    path: ':status',
    component: TodoListComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class TodoRoutingModule { }
