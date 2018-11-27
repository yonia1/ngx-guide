import { Component, OnInit, Input, OnDestroy, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import * as GuideUtils from '../utils';
import { NgGuideWalkLibService } from '../ng-guide-walk-lib.service';
import { TouchSequence } from 'selenium-webdriver';
import Popper from 'popper.js';
export type WalkLocation = Popper.Placement;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ng-guide-content',
  templateUrl: './guide-content.component.html',
  styleUrls: ['./guide-content.component.scss']
})
export class GuideContentComponent implements OnInit, OnDestroy {
  private currentAction: 'next' | 'stop' = 'next';
  private _step = 1;
  private popper: Popper;
  show = true;
  overlayObject = null;
  @Input() shouldCreateOverlay = false;
  @Input() modifiers: Popper.Modifiers;
  @Input() positionFixed = false;
  @Input() eventsEnabled = true;
  @Input() target: string | Element;
  @Input() location: WalkLocation = 'right';
  @Input() customCss: { [key: string]: string } = null;
  @Input() set step(step: number) {
    this._step = GuideUtils.toNumber(step);
  }
  get step() {
    return this._step;
  }


  constructor(
    private _element: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    private host: ElementRef<HTMLElement>,
    private guideService: NgGuideWalkLibService) {

  }

  ngOnInit() {
    // todo : move to an action trigger when needed

    const { location, positionFixed, eventsEnabled, modifiers } = this;

    this.popper = new Popper(
      this.getNode(),
      this._element.nativeElement.querySelector('.angular-popper'),
      <any>{
        placement: location,
        positionFixed,
        eventsEnabled,
        modifiers
      }
    );

    this.handleOverlay();
    //  document.getElementsByTagName('body')[0].appendChild(this.overlayObject);
    //   const root = this._renderer.selectRootElement(this._element.nativeElement);

  }

  ngOnDestroy() {
    this.popper.destroy();
    this.clean();
  }
  next() {
    this.guideService.nextGuide();


  }
  isLast() {
    return this.guideService.isLast(this.step);
  }
  done() {
    this.guideService.stopGuide();
  }
  private getNode(): Element {
    if (this.target) {
      if (typeof this.target === 'string') {
        return document.querySelector(this.target);
      } else {
        return this.target;
      }
    } else {
      return this._element.nativeElement;
    }
  }
  private handleOverlay() {
    if (!this.shouldCreateOverlay) { return; }

    if (!this.overlayObject) {
      this.overlayObject = document.createElement('div');
      this.overlayObject.setAttribute('id', 'overlay');
      document.getElementsByTagName('body')[0].appendChild(this.overlayObject);
    } else {
      document.getElementsByTagName('body')[0].appendChild(this.overlayObject);
    }
  }
  private clean() {
    if (!this.overlayObject) { return; }
    this.overlayObject.style.display = 'none';
  }
}
