import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MentorListComponent } from './list/form-list.component';

const routes: Routes = [
    { path: '', component: MentorListComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MentorRoutingModule { }
