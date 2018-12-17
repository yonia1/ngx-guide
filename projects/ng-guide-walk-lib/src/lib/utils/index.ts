import { OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * 
 * @param num - the number to parse
 * Try's to parse any to number
 */
export function toNumber(num: number | any): number {
    return Number.isInteger(num) ? num : Number.parseInt(num);
}

export function unsignedOnDestroyed(component: OnDestroy) {
  const oldNgOnDestroy = component.ngOnDestroy;
  const onDestroySubject$ = new ReplaySubject<void>(1);
  component.ngOnDestroy = () => {
    oldNgOnDestroy.apply(component);
    onDestroySubject$.next(undefined);
    onDestroySubject$.complete();
  };
  return onDestroySubject$;
}

export function toBoolean(value: boolean | string) {
  return String(value) == 'true';
}
