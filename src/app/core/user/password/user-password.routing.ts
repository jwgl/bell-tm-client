import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPasswordComponent } from './user-password.component';

const routes: Routes = [{
    path: '', component: UserPasswordComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class UserPasswordRoutingModule { }
