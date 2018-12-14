import { OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { NgGuideWalkLibService } from '../ng-guide-walk-lib.service';
import 'popper.js';
import Popper from 'popper.js';
export declare type WalkLocation = Popper.Placement;
export declare class GuideContentComponent implements OnInit, OnDestroy {
    private _element;
    private _renderer;
    private host;
    private guideService;
    private currentAction;
    private _step;
    private popper;
    show: boolean;
    overlayObject: any;
    shouldCreateOverlay: boolean;
    modifiers: Popper.Modifiers;
    positionFixed: boolean;
    eventsEnabled: boolean;
    target: string | Element;
    location: WalkLocation;
    displayArrow: boolean;
    customCss: {
        [key: string]: string;
    };
    step: number;
    constructor(_element: ElementRef<HTMLElement>, _renderer: Renderer2, host: ElementRef<HTMLElement>, guideService: NgGuideWalkLibService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    next(): void;
    isLast(): boolean;
    done(): void;
    private getNode;
    private clean;
}
