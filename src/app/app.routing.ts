import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'core/auth/auth-guard.service';

import { LoginComponent } from './login/login.component';

const routes: Routes = [{
    path: 'ui/login',
    component: LoginComponent,
}, {
    path: '',
    loadChildren: () => import('./workbench/workbench.module').then(m => m.WorkbenchModule),
    canLoad: [AuthGuard],
}];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            paramsInheritanceStrategy: 'always',
        })
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
