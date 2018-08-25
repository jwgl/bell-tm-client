import { Pipe } from '@angular/core';

import { AuditAction } from '../constants/audit-action';

type ActionInfo = {[key in AuditAction]: {class: string, text: string}};

const ACTION_INFO: ActionInfo = {
    [AuditAction.CREATE]: { class: 'text-primary', text: '新建' },
    [AuditAction.DELETE]: { class: 'text-primary', text: '删除' },
    [AuditAction.UPDATE]: { class: 'text-primary', text: '修改' },
    [AuditAction.COMMIT]: { class: 'text-primary', text: '提交' },
    [AuditAction.CANCEL]: { class: 'text-primary', text: '取消' },
    [AuditAction.ACCEPT]: { class: 'text-success', text: '同意' },
    [AuditAction.REJECT]: { class: 'text-warning', text: '退回' },
    [AuditAction.REVIEW]: { class: 'text-success', text: '加签' },
    [AuditAction.REVOKE]: { class: 'text-danger',  text: '回收' },
    [AuditAction.CLOSE]:  { class: 'text-danger',  text: '关闭' },
    [AuditAction.OPEN]:   { class: 'text-warning', text: '打开' },
};

@Pipe({ name: 'actionName' })
export class ActionNamePipe {
    transform(value: string, arg: string) {
        if (arg) {
            if (value === 'ACCEPT') {
                if (arg === 'CHECKED' || arg.endsWith('.view')) {
                    return '审批';
                } else {
                    return '审核';
                }
            }
        }
        return ACTION_INFO[AuditAction[value]].text;
    }
}

/* tslint:disable:max-classes-per-file */
@Pipe({ name: 'actionClass' })
export class ActionClassPipe {
    transform(value: any, args: any[]) {
        return ACTION_INFO[AuditAction[value]].class;
    }
}
