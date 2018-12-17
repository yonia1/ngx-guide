import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
/**
 *
 * @param num - the number to parse
 * Try's to parse any to number
 */
export declare function toNumber(num: number | any): number;
export declare function unsignedOnDestroyed(component: OnDestroy): ReplaySubject<void>;
export declare function toBoolean(value: boolean | string): boolean;
