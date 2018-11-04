import { Component } from '@angular/core';

import { AuthService } from 'core/auth';

@Component({
    styleUrls: ['form-finish.component.scss'],
    templateUrl: 'form-finish.component.html',
})
export class ResponseFormFinishComponent {
    userId: string;

    constructor(authService: AuthService) {
        this.userId = authService.userInfo.id;
    }

}
