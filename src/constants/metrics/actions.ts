export type EventAction = 'analytics-init' | 'load-init' | 'load-finished' | 'sw-init' | 'sw-finished' | 'view-mode';

export const ANALTYICS_INIT: EventAction = 'analytics-init';
export const LOAD_INIT: EventAction = 'load-init';
export const LOAD_FINISHED: EventAction = 'load-finished';
export const SW_INIT: EventAction = 'sw-init';
export const SW_FINISHED: EventAction = 'sw-finished';
export const VIEW_MODE: EventAction = 'view-mode';
