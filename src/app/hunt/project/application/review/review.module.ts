import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../../settings/shared/common-pipes';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewService } from './review.service';
import { ReviewListComponent } from './list/review-list.component';
import { ReviewDialog } from './list/review.dialog';
import { ReviewComponent } from './review.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReviewRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        FontAwesomeModule,
        PipesModule,
    ],
    declarations: [
        ReviewListComponent,
        ReviewComponent,
        ReviewDialog,
    ],
    providers: [
        ReviewService,
        {provide: 'REVIEW_API_URL', useValue: '/api/hunt/experts/${userId}/reviews' },
    ],
    entryComponents: [
        ReviewDialog,
    ],
})
export class ExpertReviewModule { }
