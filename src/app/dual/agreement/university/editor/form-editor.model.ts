import { Major, UniversityForm } from '../form.model';

declare module '../form.model' {
    interface UniversityForm {
        removedItems: Major[];

        addItem(item: Major): void;
        removeItem(item: Major): void;
        toServerDto(): any;
        getAddedItems(): any[];
    }
}

UniversityForm.prototype.addItem = function (this: UniversityForm, item: Major): void {
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

UniversityForm.prototype.removeItem = function (this: UniversityForm, item: Major): void {
    const major = this.items.find(it => it.equalsTo(item));

    if (major) {
        this.items.splice(this.items.indexOf(major), 1);
        if (major.id) {
            this.removedItems.push(major);
        }
    }
};

UniversityForm.prototype.toServerDto = function (this: UniversityForm): any {
    return {
        shortName: this.shortName.toUpperCase(),
        nameCn: this.nameCn,
        regionId: this.regionId,
        nameEn: this.nameEn,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

UniversityForm.prototype.getAddedItems = function (this: UniversityForm): any[] {
    return this.items.map(it => ({
        id: it.id,
        nameCn: it.nameCn,
        nameEn: it.nameEn,
        bachelor: it.bachelor,
    }));
};
