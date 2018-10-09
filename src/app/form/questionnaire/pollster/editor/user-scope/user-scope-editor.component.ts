import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserScope } from '../../../shared/user-scope.model';
import { UserScopeSelectDialogService } from './user-scope-select.service';

@Component({
    selector: 'tm-user-scope-editor',
    styleUrls: ['user-scope-editor.component.scss'],
    templateUrl: 'user-scope-editor.component.html',
})
export class UserScopeEditorComponent {
    @Input()
    dialogTitle: string;

    @Input()
    userScopes: UserScope[];

    @Input()
    surveyScope: number;

    @Input()
    userType: number;

    constructor(private selectService: UserScopeSelectDialogService) {
    }

    remove(userScope: UserScope) {
        this.userScopes.splice(this.userScopes.indexOf(userScope), 1);
    }

    create() {
        this.selectService.open({
            title: this.dialogTitle,
            surveyScope: this.surveyScope,
            userType: this.userType,
        }).then(result => {
            this.userScopes.push(result);
        });
    }
}
