/* tslint:disable:max-classes-per-file*/
export interface ListCounts {
    [key: string]: number;
}

export interface ListOption {
    type: string;
    label: string;
    dateLabel: string;
}

export class ListGroupItem {
    type: string;
    label: string;
    dateLabel: string;
    count = 0;
    active = false;

    constructor(option: ListOption) {
        this.type = option.type;
        this.label = option.label;
        this.dateLabel = option.dateLabel;
    }
}

export class ListGroup {
    items: ListGroupItem[];

    constructor(configs: ListOption[]) {
        this.items = configs.map(it => new ListGroupItem(it));
    }

    update(counts: ListCounts): void {
        this.items.forEach(item => {
            item.count = counts[item.type] || 0;
        });
    }

    getDateLabel(type: string): string {
        const item = this.items.find(it => it.type === type);
        return item ? item.dateLabel : '';
    }
}
