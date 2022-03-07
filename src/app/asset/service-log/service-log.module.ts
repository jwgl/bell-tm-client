import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceLogRoutingModule } from './service-log.routing';
import { ServiceLogFormListModule } from './list/from-list.module';
import { ServiceLogFormEditorModule } from './editor/form-editor.module';
import { ServiceLogFormService } from './form.service';

@NgModule({
    imports: [
        CommonModule,
        ServiceLogRoutingModule,
        ServiceLogFormListModule,
        ServiceLogFormEditorModule,
    ],
    providers: [
        ServiceLogFormService,
        { provide: 'SERVICELOG_FORM_API_URL', useValue: '/api/asset/users/${userId}/serviceLogs' },
        { provide: 'HINDFIELD_API_URL', useValue: '/api/asset/users/${userId}/hindFields' },
    ],
})
export class ServiceLogModule { }
