import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewService } from './review.service';
import { NavTabsComponent } from './common/nav-tabs.component';
import { ReviewListComponent } from './list/review-list.component';
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
    ],
    declarations: [
        ReviewListComponent,
        NavTabsComponent,
        ReviewComponent,
    ],
    providers: [
        ReviewService,
        {provide: 'REVIEW_API_URL', useValue: '/api/hunt/experts/${userId}/reviews' },
    ],
})
export class ExpertReviewModule { }
