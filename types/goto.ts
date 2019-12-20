import Vue from 'vue';

export type gotoTarget = number | string | HTMLElement | Vue;

export type Easing =
    | ((t: number) => number)
    | 'linear'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint';

export interface gotoOption {
    container?: string | HTMLElement | Vue;
    duration?: number;
    offset?: number;
    easing?: Easing;
    appOffset?: boolean;
}
