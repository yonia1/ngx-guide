import {
  Directive,
  ViewContainerRef,
  ElementRef,
  Input,
  TemplateRef,
  Type,
  EventEmitter,
  ComponentRef,
  ComponentFactoryResolver, Renderer2, Injector, OnDestroy, OnInit, Output
} from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed, toBoolean } from './utils';
import { WalkEvent } from './ng-guide.types';
import { takeUntil } from 'rxjs/operators';
import { GuideContentComponent, WalkLocation } from './guide-content/guide-content.component';

export type StepStatus = 'BeforeOpen' | 'Open' | 'BeforeClose' | 'AfterClose';

@Directive({
  selector: '[ngGuideStep]',
})
export class NgGuideStepDirective implements OnInit, OnDestroy {

  position = 'below';
  private _step: number = 1;

  @Input('ngGuideStep') set step(stepNumber: number | string) {
    this._step = toNumber(stepNumber);
  }
  get step(): number | string {
    return this._step;
  }
  @Input('ngGuideStepContent') ngGuideStepContent: string | TemplateRef<any> | Type<any>;
  @Input('ngGuideStepLocation') ngGuideStepLocation: WalkLocation = 'bottom';
  @Input('ngGuideStepStyle') ngGuideStepStyle: { [key: string]: string } | null = null;
  @Input('ngGuideStepDisplayArrow') ngGuideStepDisplayArrow: boolean = true;
  @Input('ngGuideStepOverlay') ngGuideStepOverlay: boolean | string = true;
  @Input('ngGuideStepFocusElement') ngGuideStepFocusElement: boolean = true;

  @Output('ngGuideStepStepStatus') ngGuideStepStepStatus: EventEmitter<StepStatus> = new EventEmitter();

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
    this.walkLibService.register(this.step as number);
  }
  ngOnDestroy(): void {
    this.closeComponent();
    this.walkLibService.unregister(this.step as number);
  }
  private closeComponent() {
    if (!this.componentRef) { return; }
    this.ngGuideStepStepStatus.emit('BeforeClose');
    this.componentRef.destroy();
    this.componentRef = null;
    this.ngGuideStepStepStatus.emit('AfterClose');

  }
  private generateComponent() {
    this.ngGuideStepStepStatus.emit('BeforeOpen');
    const factory = this.resolver.resolveComponentFactory(GuideContentComponent);
    const content = this.generateNgContent();
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
    this.setInputs();
    this.handleFocus();
    this.handleOverlay();
    this.ngGuideStepStepStatus.emit('Open');
  }

  private createComponent() {
    this.generateComponent();
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
    if (toBoolean(this.ngGuideStepOverlay)) {
      this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
      this.componentRef.onDestroy(() => {
        this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
      });
    }
  }
  private handleFocus() {
    if (toBoolean(this.ngGuideStepFocusElement)) {
      this.elementRef.nativeElement.focus();
    }
  }



}
