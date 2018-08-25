
type Constructor<T> = new(...args: any[]) => T;

export interface Editable {
    editable: boolean;
}

export function Editable<T extends Constructor<{}>>(Base: T): Constructor<Editable> & T {
    return class extends Base {
        editable: boolean;
        constructor(...args: any[]) {
            super(...args);
            this.editable = args[0].editable;
        }
    };
}
