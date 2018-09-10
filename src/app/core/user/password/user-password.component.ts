import { Component } from '@angular/core';

import { UserPasswordService } from './user-password.service';

@Component({
    templateUrl: 'user-password.component.html',
})
export class UserPasswordComponent {
    progressing = false;

    constructor(private service: UserPasswordService) { }

    sync() {

        this.service.sync().subscribe(() => {
            this.progressing = false;
            alert('同步成功。');
        }, error => {
            alert(error.message);
        });
    }
}
