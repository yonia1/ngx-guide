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

/**
 * Utility function for clearing subscriptions in a component
 * Example :
 * .takeUntil(unsignedOnDestroyed(this))
 *  .subscribe(()=>{})
 * @param {OnDestroy} component
 * @returns {ReplaySubject<void>}
 */
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
