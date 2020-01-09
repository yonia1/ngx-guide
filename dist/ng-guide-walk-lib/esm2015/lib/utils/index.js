/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    const oldNgOnDestroy = component.ngOnDestroy;
    /** @type {?} */
    const onDestroySubject$ = new ReplaySubject(1);
    component.ngOnDestroy = (/**
     * @return {?}
     */
    () => {
        oldNgOnDestroy.apply(component);
        onDestroySubject$.next(undefined);
        onDestroySubject$.complete();
    });
    return onDestroySubject$;
}
/**
 * @param {?} value
 * @return {?}
 */
export function toBoolean(value) {
    return String(value) == 'true';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQU9yQyxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQWlCO0lBQ3RDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFNBQW9COztVQUNoRCxjQUFjLEdBQUcsU0FBUyxDQUFDLFdBQVc7O1VBQ3RDLGlCQUFpQixHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQztJQUNwRCxTQUFTLENBQUMsV0FBVzs7O0lBQUcsR0FBRyxFQUFFO1FBQzNCLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQSxDQUFDO0lBQ0YsT0FBTyxpQkFBaUIsQ0FBQztBQUMzQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBdUI7SUFDL0MsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSBudW0gLSB0aGUgbnVtYmVyIHRvIHBhcnNlXG4gKiBUcnkncyB0byBwYXJzZSBhbnkgdG8gbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b051bWJlcihudW06IG51bWJlciB8IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobnVtKSA/IG51bSA6IE51bWJlci5wYXJzZUludChudW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zaWduZWRPbkRlc3Ryb3llZChjb21wb25lbnQ6IE9uRGVzdHJveSkge1xuICBjb25zdCBvbGROZ09uRGVzdHJveSA9IGNvbXBvbmVudC5uZ09uRGVzdHJveTtcbiAgY29uc3Qgb25EZXN0cm95U3ViamVjdCQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcbiAgY29tcG9uZW50Lm5nT25EZXN0cm95ID0gKCkgPT4ge1xuICAgIG9sZE5nT25EZXN0cm95LmFwcGx5KGNvbXBvbmVudCk7XG4gICAgb25EZXN0cm95U3ViamVjdCQubmV4dCh1bmRlZmluZWQpO1xuICAgIG9uRGVzdHJveVN1YmplY3QkLmNvbXBsZXRlKCk7XG4gIH07XG4gIHJldHVybiBvbkRlc3Ryb3lTdWJqZWN0JDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQm9vbGVhbih2YWx1ZTogYm9vbGVhbiB8IHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKSA9PSAndHJ1ZSc7XG59XG4iXX0=