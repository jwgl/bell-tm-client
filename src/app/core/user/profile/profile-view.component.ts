import { Component, OnInit } from '@angular/core';

import { UserProfileService } from './user-profile.service';

@Component({
    templateUrl: 'profile-view.component.html',
})
export class UserProfileViewComponent implements OnInit {
    user: any;

    constructor(private service: UserProfileService) { }

    ngOnInit() {
        this.service.loadList().subscribe(dto => {
            this.user = dto;
        });
    }
}
