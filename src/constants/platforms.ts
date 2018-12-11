interface IPlatform {
  id: number;
  name: string;
  userAgent: string;
}

export const PLATFORMS: IPlatform[] = [
  { id: 1, name: 'web', userAgent: 'WEB_APP' },
  { id: 2, name: 'android', userAgent: 'ANDROID_APP' },
  { id: 3, name: 'ios', userAgent: 'IOS_APP' },
];
