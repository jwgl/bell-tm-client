import * as dayjs from 'dayjs';
import { StatementForm, StatementItem } from '../../shared/statement-form.model';

declare module '../../shared/statement-form.model' {
    interface StatementForm {
        addItem(dto: any): void;
        removeItem(item: StatementItem): void;
        toServerDto(): any;
        getTotal(): number;
        valid: boolean
    }

    interface StatementItem {
        deleted: boolean;
    }

    interface BookingFacility {
        deleted: boolean;
    }

    interface BookingAuth {
        departmentId: string;
        departmentName: string;
        bookingTypeId: number;
        bookingTypeName: string;
        userId: string;
        userName: string;
    }
}

StatementForm.prototype.addItem = function (this: StatementForm, dto: any): void {
    const item = new StatementItem(this, dto);
    this.items.push(item);
};

StatementForm.prototype.removeItem = function (this: StatementForm, item: StatementItem): void {
    if (item.statementFormId) {
        item.deleted = !item.deleted;
    } else {
        this.items.splice(this.items.indexOf(item), 1);
    }
};

StatementForm.prototype.getTotal = function (this: StatementForm): number {
    return this.items.reduce((acc, item) => acc + item.subtotal, 0);
};

Object.defineProperty(StatementForm.prototype, 'valid', {
    get: function (this: StatementForm) {
        return this.items.filter(it => !it.deleted).length > 0;
    },
    enumerable: true,
    configurable: true,
});

StatementForm.prototype.toServerDto = function (this: StatementForm): any {
    return {
        id: this.id,
        departmentId: this.department.id,
        description: this.description,
        addedItems: this.items.filter(it => !it.statementFormId && !it.deleted).map(it => it.id),
        removedItems: this.items.filter(it => it.statementFormId && it.deleted).map(it => it.id),
    };
};
