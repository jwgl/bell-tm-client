import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileViewComponent } from './profile-view.component';
import { UserProfileEditComponent } from './profile-edit.component';

const routes: Routes = [{
    path: '', component: UserProfileViewComponent,
}, {
    path: 'edit', component: UserProfileEditComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserProfileRoutingModule { }
