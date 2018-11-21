import { Pipe, PipeTransform } from '@angular/core';

import { userScopeToString, UserScope } from './user-scope.model';

@Pipe({ name: 'userScopeText' })
export class UserScopeTextPipe implements PipeTransform {
    transform(userScope: UserScope, userType: string) {
        return userScopeToString(userScope, userType);
    }
}
