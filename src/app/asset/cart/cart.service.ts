import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class CartService extends RestEditService {

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('CART_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
