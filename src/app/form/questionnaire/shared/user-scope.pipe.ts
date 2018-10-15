import { Pipe } from '@angular/core';
import { userScopeToString, UserScope } from './user-scope.model';

@Pipe({ name: 'userScopeText' })
export class UserScopeTextPipe {
    transform(userScope: UserScope, userType: string) {
        return userScopeToString(userScope, userType);
    }
}
