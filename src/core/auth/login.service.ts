import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Dialog } from '../dialogs';
import { LoginDialog } from './login.dialog';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private progress = false;
    subject = new Subject<string>();

    constructor(public dialog: Dialog) { }

    openDialog(): Subject<string> {
        if (!this.progress) {
            this.progress = true;
            this.dialog.open(LoginDialog, null, () => {
                this.progress = false;
                this.subject.complete();
            }).then(() => {
                this.progress = false;
                this.subject.next('login');
            });
        }
        return this.subject;
    }
}
