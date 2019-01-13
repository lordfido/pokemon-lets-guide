import chroma from 'chroma-js';

// Colors
// B&W Scale
export const WHITE = '#fff';
export const GREY_LIGHT_5 = '#efefef';
export const GREY_LIGHT_4 = '#ccc';
export const GREY_LIGHT_3 = '#d3d3d3';
export const GREY_LIGHT_2 = '#a9a9a9';
export const GREY_LIGHT = '#808080';
export const GREY_DARK = '#666';
export const GREY_DARK_2 = '#333';
export const BLACK = '#000';

// Colors
export const RED = '#c80000';
export const GREEN = '#028733';
export const GREEN_LIGHT = '#e5fce1';
export const YELLOW = '#fff280';

// Statuses
export const SUCCESS_LIGHT = '#c1fdb5';
export const SUCCESS = '#006400';
export const WARNING_LIGHT = '#fdfeb5';
export const WARNING = '#646400';
export const DANGER_LIGHT = '#f3b5b4';
export const DANGER = '#640000';
export const DISABLED_BACKGROUND = '#f2f2f2';
export const DISABLED_BORDER = '#e6e6e6';
export const DISABLED_COLOR = '#808080';

// Branding
export const BRAND_COLOR_LIGHT = DANGER_LIGHT;
export const BRAND_COLOR = RED;
export const BRAND_COLOR_DARK = DANGER;

// Pokedex
export const POKEDEX_BACKGROUND = '#00b2b6';
export const POKEDEX_WINDOW_BACKGROUND = '#009cb3';
export const POKEDEX_WINDOW_BACKGROUND_2 = '#0378ae';
export const POKEDEX_WINDOW_BACKGROUND_3 = '#35b4d7';

export const traslucentColor = (color: string, opacity: number) => `rgba(${chroma(color).rgb()}, ${opacity})`;
export const lighterColor = (color: string, value?: number) =>
  chroma(color)
    .brighten(value)
    .hex();
