import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StudentAdminListComponent} from './list/form-list.component';

const routes: Routes = [
    {path: '', component: StudentAdminListComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class StudentAdminRoutingModule {}
