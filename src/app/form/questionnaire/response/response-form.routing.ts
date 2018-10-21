import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResponseFormEditorComponent } from './editor/form-editor.component';

const routes: Routes = [{
    path: '',
    component: ResponseFormEditorComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ResponseFormRoutingModule { }
