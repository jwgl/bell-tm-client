import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityFormEditorModule } from './editor/form-editor.module';
import { UniversityRoutingModule } from './form-routing.module';
import { UniversityFormService } from './form.service';
import { UniversityItemModule } from './item/item.module';
import { UniversityFormListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        UniversityRoutingModule,
        UniversityFormEditorModule,
        UniversityItemModule,
        UniversityFormListModule,
    ],
    providers: [
        UniversityFormService,
        { provide: 'UNIVERSITY_FORM_API_URL', useValue: '/api/dual/users/${userId}/universities' },
    ],
})
export class UniversityModule { }
