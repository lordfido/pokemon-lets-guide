import * as ReactGA from 'react-ga';
import { log } from '../utils/logger';
import { isProduction } from '../utils/platforms';

import { ANALTYICS_INIT, EventAction } from '../../constants/metrics/actions';
import { EventCategory } from '../../constants/metrics/categories';

const isDebug = false;
const isVerbose = true;
const isTracking = isDebug || isProduction();
// @ts-ignore
const timers: { [key: string]: number } = window.pokeTimers;

interface IAnalyticsInitParameter {
  tag: string;
}

interface ICustomDimension {
  key: string;
  value: any;
}

interface ITrackingEvent {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
}

interface ITimeTracking {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value: number;
}

/**
 * This "middleware" checks if event should be sent to Analytics and if that
 * should be reported through devTools
 */
const dispatch = (track: () => void, report: () => void) => {
  if (isTracking) {
    track();
  }

  if (isVerbose && !isTracking) {
    report();
  }
};

/**
 * Collection of methods to interact with Google Analytics
 */
const analyticsApi = {
  init: ({ tag }: IAnalyticsInitParameter) =>
    new Promise(resolve => {
      timers[ANALTYICS_INIT] = new Date().getTime();

      dispatch(
        () => {
          ReactGA.initialize(tag, {
            debug: isDebug,
          });
        },
        () => {
          log(`GA: Analytics <${tag}> has been initialized`);
        }
      );
      resolve();
    }),

  /**
   * Creates a custom dimension in GA
   */
  set: ({ key, value }: ICustomDimension) =>
    new Promise(resolve => {
      dispatch(
        () => {
          ReactGA.set({ [key]: value });
        },
        () => {
          log(`GA: Custom dimension <${key}> has been setup`);
        }
      );
      resolve();
    }),

  /**
   * Log a navigation
   */
  logPageView: (pathname: string) =>
    new Promise(resolve => {
      dispatch(
        () => {
          ReactGA.pageview(pathname);
        },
        () => {
          log(`GA: Page navigation to <${pathname}> has been logged`);
        }
      );
      resolve();
    }),

  /**
   * This function will create a tracking event based on parameters and track it
   */
  logEvent: ({ action, category, label, value }: ITrackingEvent) =>
    new Promise(resolve => {
      const event = {
        action,
        category,
        label,
        value,
      };

      dispatch(
        () => {
          ReactGA.event(event);
        },
        () => {
          log(`GA: <${event.action}> has been logged`, event);
        }
      );
      resolve();
    }),

  /**
   * Log time values
   */
  logTiming: ({ action, category, label, value }: ITimeTracking) =>
    new Promise(resolve => {
      const event = {
        category,
        label,
        value,
        variable: action,
      };

      dispatch(
        () => {
          ReactGA.timing(event);
        },
        () => {
          log(`GA: <${category}> has been logged`, event);
        }
      );
      resolve();
    }),

  /**
   * Stores a date time, so this can be checked in other places
   */
  setTimer: (key: string, value: number) => {
    log(`GA: Timer <${key}> has been set`, value);
    timers[key] = value;
  },

  /**
   * Stores a date time, so this can be checked in other places
   */
  getTimer: (key: string) => timers[key] || 0,
};

export default analyticsApi;
