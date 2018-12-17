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
    const oldNgOnDestroy = component.ngOnDestroy;
    /** @type {?} */
    const onDestroySubject$ = new ReplaySubject(1);
    component.ngOnDestroy = () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBT3JDLE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBaUI7SUFDdEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsU0FBb0I7O1VBQ2hELGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVzs7VUFDdEMsaUJBQWlCLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDO0lBQ3BELFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQzNCLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUNGLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQXVCO0lBQy9DLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogXG4gKiBAcGFyYW0gbnVtIC0gdGhlIG51bWJlciB0byBwYXJzZVxuICogVHJ5J3MgdG8gcGFyc2UgYW55IHRvIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9OdW1iZXIobnVtOiBudW1iZXIgfCBhbnkpOiBudW1iZXIge1xuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKG51bSkgPyBudW0gOiBOdW1iZXIucGFyc2VJbnQobnVtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2lnbmVkT25EZXN0cm95ZWQoY29tcG9uZW50OiBPbkRlc3Ryb3kpIHtcbiAgY29uc3Qgb2xkTmdPbkRlc3Ryb3kgPSBjb21wb25lbnQubmdPbkRlc3Ryb3k7XG4gIGNvbnN0IG9uRGVzdHJveVN1YmplY3QkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oMSk7XG4gIGNvbXBvbmVudC5uZ09uRGVzdHJveSA9ICgpID0+IHtcbiAgICBvbGROZ09uRGVzdHJveS5hcHBseShjb21wb25lbnQpO1xuICAgIG9uRGVzdHJveVN1YmplY3QkLm5leHQodW5kZWZpbmVkKTtcbiAgICBvbkRlc3Ryb3lTdWJqZWN0JC5jb21wbGV0ZSgpO1xuICB9O1xuICByZXR1cm4gb25EZXN0cm95U3ViamVjdCQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0Jvb2xlYW4odmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkgPT0gJ3RydWUnO1xufVxuIl19