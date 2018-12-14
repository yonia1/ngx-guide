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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBT3JDLE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBaUI7SUFDdEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsU0FBb0I7O1VBQ2hELGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVzs7VUFDdEMsaUJBQWlCLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDO0lBQ3BELFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQzNCLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUNGLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFxuICogQHBhcmFtIG51bSAtIHRoZSBudW1iZXIgdG8gcGFyc2VcbiAqIFRyeSdzIHRvIHBhcnNlIGFueSB0byBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvTnVtYmVyKG51bTogbnVtYmVyIHwgYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihudW0pID8gbnVtIDogTnVtYmVyLnBhcnNlSW50KG51bSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNpZ25lZE9uRGVzdHJveWVkKGNvbXBvbmVudDogT25EZXN0cm95KSB7XG4gIGNvbnN0IG9sZE5nT25EZXN0cm95ID0gY29tcG9uZW50Lm5nT25EZXN0cm95O1xuICBjb25zdCBvbkRlc3Ryb3lTdWJqZWN0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xuICBjb21wb25lbnQubmdPbkRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgb2xkTmdPbkRlc3Ryb3kuYXBwbHkoY29tcG9uZW50KTtcbiAgICBvbkRlc3Ryb3lTdWJqZWN0JC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgb25EZXN0cm95U3ViamVjdCQuY29tcGxldGUoKTtcbiAgfTtcbiAgcmV0dXJuIG9uRGVzdHJveVN1YmplY3QkO1xufVxuIl19