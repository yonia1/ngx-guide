import {
  Directive,
  ViewContainerRef,
  ElementRef,
  Input,
  TemplateRef,
  Type,
  ComponentRef,
  ComponentFactoryResolver, Renderer2, Injector, OnDestroy, OnInit
} from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed } from './utils';
import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';
import { WalkEvent } from './ng-guide.types';
import { takeUntil } from 'rxjs/operators';
import { GuideContentComponent } from './guide-content/guide-content.component';
import { Overlay, OverlayConfig, OriginConnectionPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';



@Directive({
  selector: '[ngGuideStep]',
})
export class NgGuideStepDirective implements OnInit, OnDestroy {

  position = 'below';

  private _step: number = 1;
  @Input('ngGuideStep') set step(stepNumber: number | string) {
    this._step = toNumber(stepNumber);
  }
  get step() {
    return this._step;
  }
  @Input('ngGuideStepContent') ngGuideStepContent: string | TemplateRef<any> | Type<any>;
  private componentRef: ComponentRef<GuideContentComponent>;
  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private walkLibService: NgGuideWalkLibService) { }

  ngOnInit(): void {
    this.subscribeToGuideRequest();
    this.walkLibService.register();
  }
  ngOnDestroy(): void {
    this.closeComponent();
    this.walkLibService.unregister();
  }
  private closeComponent() {
    if (this.componentRef) { this.componentRef.destroy(); }
    this.componentRef = null;
  }
  private createComponent() {
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    const positionStrategy = this.overlay
    .position()
    .connectedTo(this.elementRef.nativeElement, origin.main, overlay.main);
      const overlayConfig = new OverlayConfig({
        positionStrategy
      });
     
    const overlayRef = this.overlay.create(overlayConfig);
    const guideContentComponent = new ComponentPortal(GuideContentComponent, this.viewContainerRef);
    const instance = overlayRef.attach(guideContentComponent).instance;

  //   const factory = this.resolver.resolveComponentFactory(GuideContentComponent);
  //   // const rect = this.viewContainerRef.element.nativeElement.getBoundingClientRect();
  
  //  //  console.log(rect.top, rect.right, rect.bottom, rect.left);
 
  //   this.componentRef = this.viewContainerRef.createComponent(factory, null, null, this.generateNgContent());
  //   this.componentRef.instance.step = this.step as number;
  //   // this.componentRef.instance.bound = rect;
  //   this.elementRef.nativeElement.focus();
  }
  generateNgContent() {
    // Content is string
    if (typeof this.ngGuideStepContent === 'string') {
      const element = this.renderer.createText(this.ngGuideStepContent);
      return [[element]];
    }
    // Content is Template
    if (this.ngGuideStepContent instanceof TemplateRef) {
      const viewRefTemplate = this.ngGuideStepContent.createEmbeddedView({});
      return [viewRefTemplate.rootNodes];
    }

    // Else it's a component
    const factory = this.resolver.resolveComponentFactory(this.ngGuideStepContent);
    const viewRef = factory.create(this.injector);
    return [[viewRef.location.nativeElement]];
  }

  private subscribeToGuideRequest() {
    this.walkLibService.getStepObservable(<number>this.step)
      .pipe(takeUntil(unsignedOnDestroyed(this)))
      .subscribe((walkEvent: WalkEvent) => walkEvent.event === 'open' ? this.createComponent() : this.closeComponent());
  }

  _getOrigin(): {main: OriginConnectionPosition, fallback: OriginConnectionPosition} {
    const isDirectionLtr = 'ltr'; //  !this._dir || this._dir.value == 'ltr';
    let position: OriginConnectionPosition;

    if (this.position === 'above' || this.position === 'below') {
      position = {originX: 'center', originY: this.position === 'above' ? 'top' : 'bottom'};
    } else if (this.position === 'left' ||
               this.position === 'before' && isDirectionLtr ||
               this.position === 'after' && !isDirectionLtr) {
      position = {originX: 'start', originY: 'center'};
    } else if (this.position === 'right' ||
               this.position === 'after' && isDirectionLtr ||
               this.position === 'before' && !isDirectionLtr) {
      position = {originX: 'end', originY: 'center'};
    } else {
      throw Error(this.position);
    }

    const {x, y} = this._invertPosition(position.originX, position.originY);

    return {
      main: position,
      fallback: {originX: x, originY: y}
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition(): {main: any, fallback: any} {
    const isLtr = 'ltr'// !this._dir || this._dir.value === 'ltr';
    let position: any;

    if (this.position === 'above') {
      position = {overlayX: 'center', overlayY: 'bottom'};
    } else if (this.position === 'below') {
      position = {overlayX: 'center', overlayY: 'top'};
    } else if (this.position === 'left' ||
               this.position === 'before' && isLtr ||
               this.position === 'after' && !isLtr) {
      position = {overlayX: 'end', overlayY: 'center'};
    } else if (this.position === 'right' ||
               this.position === 'after' && isLtr ||
               this.position === 'before' && !isLtr) {
      position = {overlayX: 'start', overlayY: 'center'};
    } else {
      throw Error(this.position);
    }

    const {x, y} = this._invertPosition(position.overlayX, position.overlayY);

    return {
      main: position,
      fallback: {overlayX: x, overlayY: y}
    };
  }
  private _invertPosition(x: any, y: any) {
    if (this.position === 'above' || this.position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return {x, y};
  }

}
