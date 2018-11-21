const { NODE_ENV: env } = process.env;

// Environments
export const isProduction = () => env === 'production';
export const isPre = () => env === 'pre';
export const isDev = () => env === 'dev';

// Client
export const isElectron = () => self.location.protocol === 'file:';
export const isInstalledPWA = () => self.matchMedia('(display-mode: standalone)').matches;
export const isAnyApp = () => isElectron() || isInstalledPWA();

// Operative System
export const isAndroid = () => /android/.test(self.navigator.userAgent.toLowerCase());
export const isIOS = () => /ipod|iphone|ipad/.test(self.navigator.userAgent.toLowerCase());

// Browser
