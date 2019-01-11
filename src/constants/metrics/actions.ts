export type EventAction = 'analytics-init' | 'app-init' | 'app-parsed' | 'app-finished' | 'sw-init' | 'sw-finished' | 'view-mode';

export const ANALTYICS_INIT: EventAction = 'analytics-init';
export const APP_INIT: EventAction = 'app-init';
export const APP_PARSED: EventAction = 'app-parsed';
export const APP_FINISHED: EventAction = 'app-finished';
export const SW_INIT: EventAction = 'sw-init';
export const SW_FINISHED: EventAction = 'sw-finished';
export const VIEW_MODE: EventAction = 'view-mode';
