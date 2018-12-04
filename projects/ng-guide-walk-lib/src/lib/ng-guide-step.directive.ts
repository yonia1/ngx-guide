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
import { WalkEvent } from './ng-guide.types';
import { takeUntil } from 'rxjs/operators';
import { GuideContentComponent, WalkLocation } from './guide-content/guide-content.component';



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

  @Input('ngGuideStepLocation') ngGuideStepLocation: WalkLocation = 'bottom';
  @Input('ngGuideStepStyle') ngGuideStepStyle: { [key: string]: string } | null = null;
  @Input('ngGuideStepDisplayArrow') ngGuideStepDisplayArrow: boolean = true;
  @Input('ngGuideStepFocusElement') ngGuideStepFocusElement: boolean = true;
  private componentRef: ComponentRef<GuideContentComponent>;
  constructor(
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
    if (!this.componentRef) { return; }
    this.componentRef.destroy();
    this.componentRef = null;
  }
  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(GuideContentComponent);
    const content = this.generateNgContent();
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
    this.setInputs();
    
    this.handleFocus();
    this.handleOverlay();
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
  private setInputs() {
    const instanceRef = this.componentRef.instance;
    instanceRef.step = this.step as number;
    instanceRef.target = this.elementRef.nativeElement;
    instanceRef.location = this.ngGuideStepLocation || 'bottom';
    instanceRef.displayArrow = this.ngGuideStepDisplayArrow;
    if (this.ngGuideStepStyle) {
      instanceRef.customCss = this.ngGuideStepStyle;
    }
  }
  private subscribeToGuideRequest() {
    this.walkLibService.getStepObservable(<number>this.step)
      .pipe(takeUntil(unsignedOnDestroyed(this)))
      .subscribe((walkEvent: WalkEvent) => walkEvent.event === 'open' ? this.createComponent() : this.closeComponent());
  }

  private handleOverlay() {
    this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
    // this.elementRef.nativeElement.classList.add('overlay');
    this.componentRef.onDestroy(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
    });
  }
  private handleFocus() {
    if (this.ngGuideStepFocusElement) {
      this.elementRef.nativeElement.focus();
    }
  }



}
