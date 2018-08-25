import { template } from 'lodash';

const pattern = /\$\{[^\}]*\}/;

export class ApiUrl {
    private url: string;

    constructor(url: string, templateParams?: object) {
        if (pattern.test(url)) {
            if (!!templateParams) {
                this.url = `${template(url)(templateParams)}`;
            } else {
                throw new Error('Should provide template params');
            }
        } else {
            this.url = url;
        }
    }

    list(options: { [key: string]: any } = {}) {
        if (Object.keys(options).length !== 0) {
            return `${this.url}?${this.buildQueryString(options)}`;
        } else {
            return this.url;
        }
    }

    item(id: any): string {
        return `${this.list()}/${id}`;
    }

    itemForRevise(id: any): string {
        return `${this.list()}/create?type=revise&base=${id}`;

    }

    itemForEdit(id: any): string {
        return `${this.item(id)}/edit`;
    }

    dataForCreate(options: { [key: string]: any } = {}): string {
        if (Object.keys(options).length !== 0) {
            return `${this.list()}/create?${this.buildQueryString(options)}`;
        } else {
            return `${this.list()}/create`;
        }
    }

    revise(): string {
        return `${this.list()}?type=revise`;
    }

    submit(id: any): string {
        return `${this.item(id)}?op=SUBMIT`;
    }

    revoke(id: any) {
        return `${this.item(id)}/workitems/undefined?op=REVOKE`;
    }

    checkers(id: any): string {
        return `${this.item(id)}/checkers`;
    }

    approvers(id: any): string {
        return `${this.item(id)}/approvers`;
    }

    tousers(id: any): string {
        return `${this.item(id)}/tousers`;
    }

    workitem(id: any, wi: any) {
        return `${this.item(id)}/workitems/${wi}`;
    }

    accept(id: any, wi: any) {
        return `${this.workitem(id, wi)}?op=ACCEPT`;
    }

    reject(id: any, wi: any) {
        return `${this.workitem(id, wi)}?op=REJECT`;
    }

    next(id: any, wi: any) {
        return `${this.workitem(id, wi)}?op=NEXT`;
    }

    buildQueryString(options: { [key: string]: string }): string {
        const search: string[] = [];
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                search.push(`${key}=${encodeURIComponent(options[key])}`);
            }
        }

        return search.join('&');
    }
}

