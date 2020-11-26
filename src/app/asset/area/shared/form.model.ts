export const statusLabel = { CREATED: '未提交', SUBMITTED: '提交', APPROVED: '同意', REJECTED: '不同意'};
export class Asset {
    id: number;
    sn: string;
    code: string;
    price: number;
    dateBought: string;
    qualifyMonth: number;
    dateForbid: string;
    dateClose: string;
    state: string;
    fault: boolean;
    supplierId: number;
    assetModelId: number;
    assetType: string;
    name: string;
    brand: string;
    specs: string;
    parameter: string;
    unit: string;
    pcs: number;
    total: number;
    supplier: string;
    note: string;

    constructor(dto: any) {
        Object.assign(this, dto);
    }

    equalsTo(other: Asset): boolean {
        if (this.id && other.id && this.id === other.id) {
            return true;
        }
        return false;
    }
}

export class TransferForm {
    id: number;
    dateSubmitted: string;
    operator: string;
    approver: string;
    dateApproved: string;
    note: string;
    title: string;
    status: string;
    type: string;
    source: string;
    target: string;
    workflowInstanceId: string;
    items: Asset[];

    constructor(dto: any) {
        Object.assign(this, dto);
        // 流程中的名称
        this.title = `${this.type}单`;
        // 提前转换成中文
        this.status = statusLabel[this.status];
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
