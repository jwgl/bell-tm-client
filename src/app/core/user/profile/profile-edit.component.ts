import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserProfileService } from './user-profile.service';

@Component({
    styleUrls: ['profile-view.component.scss'],
    templateUrl: 'profile-edit.component.html',
})
export class UserProfileEditComponent implements OnInit {
    user: any;
    saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: UserProfileService,
    ) { }

    ngOnInit() {
        this.service.loadList().subscribe(dto => {
            this.user = dto;
        });
    }

    save() {
        this.saving = true;
        this.service.updateUser({
            email: this.user.email,
            officePhone: this.user.officePhone,
            longPhone: this.user.longPhone,
            shortPhone: this.user.shortPhone,
        }).subscribe(() => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error);
        });
    }
}
