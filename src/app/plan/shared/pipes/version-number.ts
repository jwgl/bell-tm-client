import { Pipe, PipeTransform } from '@angular/core';
import { toVersionString } from '../utils/version-utils';

@Pipe({ name: 'versionNumber' })
export class VersionNumberPipe implements PipeTransform {
    transform(version: any) {
        return toVersionString(version);
    }
}
