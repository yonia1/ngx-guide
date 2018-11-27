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
  styleUrls: ['./guide-content.component.scss']}
})
export class GuideContentComponent implements OnInit, OnDestroy {
  private currentAction: 'next' | 'stop' = 'next';
  private _step = 1;
  private popper: Popper;
  show = true;
  @Input() modifiers: Popper.Modifiers;
  @Input() positionFixed = false;
  @Input() eventsEnabled = true;
  @Input() target: string | Element;
  @Input() location: WalkLocation = 'bottom';

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
        location ,
        positionFixed,
        eventsEnabled,
        modifiers
      }
    );
  }

  ngOnDestroy() {

  }
  next() {
    this.guideService.nextGuide();

  }
  isLast() {
    return this.guideService.isLast(this.step);
  }
  done() {
    this.currentAction = 'stop';
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
  
}
