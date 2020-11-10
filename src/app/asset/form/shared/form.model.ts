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

export class ReceiptForm {
    id: number;
    dateCheckIn: string;
    operator: string;
    checker: string;
    dateChecked: string;
    note: string;
    items: Asset[];

    constructor(dto: any) {
        Object.assign(this, dto);
        if (dto.items) {
            this.items = dto.items.map(it => new Asset(it));
        } else {
            this.items = [];
        }
    }
}
