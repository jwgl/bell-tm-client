import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { UserProfileEditComponent } from './profile-edit.component';
import { UserProfileViewComponent } from './profile-view.component';
import { UserProfileRoutingModule } from './user-profile.routing';
import { UserProfileService } from './user-profile.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        UserProfileRoutingModule,
    ],
    declarations: [
        UserProfileEditComponent,
        UserProfileViewComponent,
    ],
    providers: [
        UserProfileService,
        { provide: 'USER_PROFILE_API_URL', useValue: '/api/core/users/${userId}/profile' },
    ],
})
export class UserProfileModule { }
