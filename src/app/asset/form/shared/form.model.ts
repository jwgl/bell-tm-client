import { Asset } from '../../shared/asset-form.model';
export { Asset } from '../../shared/asset-form.model';

export class ReceiptForm {
    id: number;
    dateCheckIn: string;
    operator: string;
    approver: string;
    dateApproved: string;
    note: string;
    title: string;
    status: string;
    workflowInstanceId: string;
    items: Asset[];

    constructor(dto: any) {
        Object.assign(this, dto);
        if (dto.items) {
            this.items = dto.items.map(it => new Asset(it));
        } else {
            this.items = [];
        }
    }

    get workflowTitle(): string {
        return `${this.title}#${this.id}`;
    }
}
