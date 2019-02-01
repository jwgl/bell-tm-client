import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../shared/common-pipes';

import { TypeEditorModule } from './editor/type-editor.module';
import { TypeListModule } from './list/type-list.module';
import { HuntTypeRoutingModule } from './type-routing.module';
import { TypeService } from './type.service';

@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        CommonDirectivesModule,
        HuntTypeRoutingModule,
        TypeListModule,
        TypeEditorModule,
    ],
    providers: [
        TypeService,
        { provide: 'SUBTYPE_API_URL', useValue: '/api/hunt/settings/subtypes' },
        { provide: 'PARENTTYPE_API_URL', useValue: '/api/hunt/settings/types' },
    ],
})
export class HuntTypeModule { }
