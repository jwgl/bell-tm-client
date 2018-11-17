import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MisconductCheckItemComponent } from './item/form-item.component';
import { MisconductCheckListComponent } from './list/form-list.component';
import { MisconductCheckComponent } from './misconduct-check.component';

const routes: Routes = [{
    path: '',
    component: MisconductCheckComponent,
    children: [{
        path: '',
        redirectTo: 's/todo',
        pathMatch: 'full'
    }, {
        path: 's/:status',
        component: MisconductCheckListComponent,
    }, {
        path: 's/:status/:id',
        component: MisconductCheckItemComponent,
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MisconductCheckRoutingModule { }
