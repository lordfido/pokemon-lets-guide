import { DEVELOPMENT, Environment, PRE_PRODUCTION, PRODUCTION } from '../../constants/environment';

const env = process.env.NODE_ENV as Environment;

// Environments
export const isProduction = () => env === PRODUCTION;
export const isPre = () => env === PRE_PRODUCTION;
export const isDev = () => env === DEVELOPMENT;

// Client
export const isElectron = () => self.location.protocol === 'file:';
export const isInstalledPWA = () => self.matchMedia('(display-mode: standalone)').matches;
export const isAnyApp = () => isElectron() || isInstalledPWA();

// Operative System
export const isAndroid = () => /android/.test(self.navigator.userAgent.toLowerCase());
export const isIOS = () => /ipod|iphone|ipad/.test(self.navigator.userAgent.toLowerCase());

// Browser
