import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { ROUTE_REUSE_FLAG } from './reusable';
import { Injectable } from "@angular/core";

@Injectable()
export class ComponentReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (this.reuable(route)) {
            this.handlers[this.routeKey(route)] = handle;
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (this.reuable(route)) {
            return !!this.handlers[this.routeKey(route)];
        } else {
            return false;
        }
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (this.reuable(route)) {
            return this.handlers[this.routeKey(route)];
        } else {
            return null;
        }
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    private reuable(route: ActivatedRouteSnapshot): boolean {
        if (route.component && typeof route.component === 'function') {
            return !!route.component[ROUTE_REUSE_FLAG];
        } else {
            return false;
        }
    }

    private routeKey(route: ActivatedRouteSnapshot): string {
        if (route.component && typeof route.component === 'function') {
            return route.component.name;
        } else {
            return null;
        }
    }
}
