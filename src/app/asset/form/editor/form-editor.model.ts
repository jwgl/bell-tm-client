import { Asset, ReceiptForm } from '../shared/form.model';

declare module '../shared/form.model' {
    interface ReceiptForm {
        removedItems: Asset[];

        addItem(item: Asset): void;
        removeItem(item: Asset): void;
        toServerDto(): any;
        getAddedItems(): any[];
    }
}

ReceiptForm.prototype.addItem = function(this: ReceiptForm, item: Asset): void {
    if (this.items.find(it => it.equalsTo(item))) {
        return;
    }

    const removedItem = this.removedItems.find(i => i.equalsTo(item));
    if (removedItem) {
        this.removedItems.splice(this.removedItems.indexOf(removedItem), 1);
        this.items.push(removedItem);
    } else {
        this.items.push(item);
    }
};

ReceiptForm.prototype.removeItem = function(this: ReceiptForm, item: Asset): void {
    const asset = this.items.find(it => it.equalsTo(item));
    console.log('asset picked');
    console.log(asset);
    if (asset) {
        this.items.splice(this.items.indexOf(asset), 1);
        if (asset.id) {
            this.removedItems.push(asset);
        }
    }
};

ReceiptForm.prototype.toServerDto = function(this: ReceiptForm): any {
    return {
        note: this.note,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

ReceiptForm.prototype.getAddedItems = function(this: ReceiptForm): any[] {
    return this.items.map(it => ({
        id: it.id,
        sn: it.sn,
        code: it.code,
        price: it.price,
        dateBought: it.dateBought,
        qualifyMonth: it.qualifyMonth,
        supplierId: it.supplierId,
        assetModelId: it.assetModelId,
        assetType: it.assetType,
        unit: it.unit,
        pcs: it.pcs,
        note: it.note,
    }));
};
