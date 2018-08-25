import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { SubjectDirectorRoutingModule } from './subject-director.routing';
import { SubjectDirectorComponent } from './subject-director.component';
import { SubjectDirectorService } from './subject-director.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        SubjectDirectorRoutingModule
    ],
    declarations: [
        SubjectDirectorComponent,
    ],
    providers: [
        SubjectDirectorService,
        { provide: 'SUBJECT_DIRECTOR_API_URL', useValue: '/api/plan/settings/subjects' },
    ]
})
export class SubjectDirectorModule { }
