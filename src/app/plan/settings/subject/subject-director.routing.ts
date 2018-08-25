import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectDirectorComponent } from './subject-director.component';

const routes: Routes = [{
    path: '',
    component: SubjectDirectorComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class SubjectDirectorRoutingModule { }
