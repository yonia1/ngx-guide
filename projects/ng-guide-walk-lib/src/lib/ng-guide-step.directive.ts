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
    const factory = this.resolver.resolveComponentFactory(GuideContentComponent);
    const content = this.generateNgContent();
    this.componentRef = this.viewContainerRef.createComponent(factory, null, null, content);
    this.componentRef.instance.step = this.step as number;
    this.componentRef.instance.target = this.elementRef.nativeElement;
    this.elementRef.nativeElement.focus();
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



}
