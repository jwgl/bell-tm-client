import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramSettingsComponent } from './program-settings.component';

const routes: Routes = [{
    path: '',
    component: ProgramSettingsComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ProgramSettingRoutingModule { }
