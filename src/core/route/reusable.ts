import { Type } from '@angular/core';

export const ROUTE_REUSE_FLAG = '__route_reusable__';

export function Reusable() {
    return function (component: Type<any>) {
        Object.defineProperty(component, ROUTE_REUSE_FLAG, {value: true});
    };
}
