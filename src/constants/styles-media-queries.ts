const getMinMediaQuery = (limit: number) => `@media screen and (min-width: ${limit}px)`;
const getMaxMediaQuery = (limit: number) => `@media screen and (max-width: ${limit}px)`;

// Mobile
export const MOBILE = getMinMediaQuery(320);
export const MAX_MOBILE = getMaxMediaQuery(479);
export const MOBILE_L = getMinMediaQuery(480);
export const MAX_MOBILE_L = getMaxMediaQuery(511);
export const MOBILE_XL = getMinMediaQuery(512);
export const MAX_MOBILE_XL = getMaxMediaQuery(589);
export const MOBILE_XXL = getMinMediaQuery(590);
export const MAX_MOBILE_XXL = getMaxMediaQuery(719);

// Tablet
export const TABLET = getMinMediaQuery(720);
export const MAX_TABLET = getMaxMediaQuery(967);
export const TABLET_L = getMinMediaQuery(968);
export const MAX_TABLET_L = getMaxMediaQuery(1023);

// Desktop
export const DESKTOP = getMinMediaQuery(1024);
export const MAX_DESKTOP = getMaxMediaQuery(1279);
export const DESKTOP_L = getMinMediaQuery(1280);
export const MAX_DESKTOP_L = getMaxMediaQuery(1920);

// Bigger screens
export const HD_DISPLAY = getMinMediaQuery(1921);

// Mixes
export const TABLET_OR_LANDSCAPE = `${getMinMediaQuery(720)}, screen and (orientation: landscape)`;

const getQuery = (query: string) => query.replace('@media screen and ', '');
export default getQuery;
