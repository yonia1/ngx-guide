/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { ReplaySubject } from 'rxjs';
/**
 *
 * @param {?} num - the number to parse
 * Try's to parse any to number
 * @return {?}
 */
export function toNumber(num) {
    return Number.isInteger(num) ? num : Number.parseInt(num);
}
/**
 * @param {?} component
 * @return {?}
 */
export function unsignedOnDestroyed(component) {
    /** @type {?} */
    var oldNgOnDestroy = component.ngOnDestroy;
    /** @type {?} */
    var onDestroySubject$ = new ReplaySubject(1);
    component.ngOnDestroy = function () {
        oldNgOnDestroy.apply(component);
        onDestroySubject$.next(undefined);
        onDestroySubject$.complete();
    };
    return onDestroySubject$;
}
/**
 * @param {?} value
 * @return {?}
 */
export function toBoolean(value) {
    return String(value) == 'true';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBT3JDLE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBaUI7SUFDdEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsU0FBb0I7O1FBQ2hELGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVzs7UUFDdEMsaUJBQWlCLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDO0lBQ3BELFNBQVMsQ0FBQyxXQUFXLEdBQUc7UUFDdEIsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxpQkFBaUIsQ0FBQztBQUMzQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBdUI7SUFDL0MsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBudW0gLSB0aGUgbnVtYmVyIHRvIHBhcnNlXG4gKiBUcnkncyB0byBwYXJzZSBhbnkgdG8gbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b051bWJlcihudW06IG51bWJlciB8IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtKSA/IG51bSA6IE51bWJlci5wYXJzZUludChudW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zaWduZWRPbkRlc3Ryb3llZChjb21wb25lbnQ6IE9uRGVzdHJveSkge1xuICBjb25zdCBvbGROZ09uRGVzdHJveSA9IGNvbXBvbmVudC5uZ09uRGVzdHJveTtcbiAgY29uc3Qgb25EZXN0cm95U3ViamVjdCQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcbiAgY29tcG9uZW50Lm5nT25EZXN0cm95ID0gKCkgPT4ge1xuICAgIG9sZE5nT25EZXN0cm95LmFwcGx5KGNvbXBvbmVudCk7XG4gICAgb25EZXN0cm95U3ViamVjdCQubmV4dCh1bmRlZmluZWQpO1xuICAgIG9uRGVzdHJveVN1YmplY3QkLmNvbXBsZXRlKCk7XG4gIH07XG4gIHJldHVybiBvbkRlc3Ryb3lTdWJqZWN0JDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKSA9PSAndHJ1ZSc7XG59XG4iXX0=