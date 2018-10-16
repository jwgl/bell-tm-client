import { ElementRef } from '@angular/core';

import { Observable, combineLatest, fromEvent, merge, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

export function typeahead(element: ElementRef, minLength = 1, debounce = 250): Observable<string> {
    return combineLatest(
        merge(
            of(false),
            fromEvent(element.nativeElement, 'compositionstart').pipe(map(() => true)),
            fromEvent(element.nativeElement, 'compositionend').pipe(map(() => false)),
        ),
        fromEvent(element.nativeElement, 'keyup'),
    ).pipe(
        filter(array => !array[0]),
        map(array => array[1]),
        map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
        debounceTime(debounce),
        distinctUntilChanged(),
        filter(value => value.length >= minLength)
    );
}
