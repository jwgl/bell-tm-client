export const assetStatus = { USING: '在用', STANDBY: '备用', REPAIRING: '维修', OFF: '报废',  CLEARANCE: '核销', LOST: '丢失'};

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
    building: string;
    place: string;
    roomId: number;
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
        // 提前转换成中文
        this.state = assetStatus[this.state];
    }

    equalsTo(other: Asset): boolean {
        if (this.id && other.id && this.id === other.id) {
            return true;
        }
        return false;
    }
}
