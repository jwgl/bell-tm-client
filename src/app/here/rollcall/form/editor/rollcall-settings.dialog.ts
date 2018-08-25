import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

@Component({
    templateUrl: 'rollcall-settings.dialog.html',
})
export class RollcallSettingsDialog extends BaseDialog {
    hideFree = false;
    hideLeave = false;
    hideCancel = false;
    random = 50;

    _randomEnabled = false;

    get randomEnabled() {
        return this._randomEnabled;
    }

    set randomEnabled(value: boolean) {
        this._randomEnabled = value;
        if (this._randomEnabled) {
            if (this.random < 10 || this.random > 90) {
                this.random = 50;
            }
        }
    }

    protected onOpening(): Observable<any> {
        if (this.options) {
            if (this.options.hideFree !== undefined) {
                this.hideFree = this.options.hideFree;
            }
            if (this.options.hideLeave !== undefined) {
                this.hideLeave = this.options.hideLeave;
            }
            if (this.options.hideFree !== undefined) {
                this.hideCancel = this.options.hideCancel;
            }
            if (this.options.random !== undefined) {
                this.random = this.options.random;
            }

            this._randomEnabled = this.random >= 10 && this.random <= 90;
        }
        return null;
    }

    protected onConfirmed(): any {
        return {
            hideFree: this.hideFree,
            hideLeave: this.hideLeave,
            hideCancel: this.hideCancel,
            random: this.randomEnabled ? this.random : 100,
        };
    }
}
