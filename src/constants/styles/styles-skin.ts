import {
  BLACK,
  BLUE,
  GREEN,
  GREY_LIGHT,
  GREY_LIGHT_2,
  GREY_LIGHT_3,
  GREY_LIGHT_4,
  GREY_LIGHT_5,
  GREY_LIGHT_6,
  ORANGE,
  ORANGE_DARK,
  traslucentColor,
  WHITE,
} from './styles-colors';

// App
export const APP_BACKGROUND = GREY_LIGHT_5;

// Modal
export const MODAL_BACKGROUND = `linear-gradient(135deg, ${BLUE} 0%, ${GREEN} 50%, ${BLUE} 100%)`;
export const MODAL_CONTENT_BACKGROUND = traslucentColor(WHITE, 0.7);
export const MODAL_BACKDROP_BAKGROUND = traslucentColor(BLACK, 0.3);

// Sidebar
export const SIDEBAR_BACKGROUND = GREY_LIGHT_5;
export const SIDEBAR_BACKDROP_BACKGROUND = traslucentColor(BLACK, 0.4);

// Window
export const WINDOW_BACKGROUND = GREY_LIGHT_6;
export const WINDOW_BORDER = WHITE;

// Buttons
export const BUTTON_BORDER = ORANGE;
export const BUTTON_BORDER_ACTIVE = WHITE;
export const BUTTON_BACKGROUND = WHITE;
export const BUTTON_BACKGROUND_ACTIVE = `linear-gradient(to top, ${ORANGE_DARK} 0%, ${ORANGE} 100%)`;
export const BUTTON_DISABLED_BACKGROUND = GREY_LIGHT_3;
export const BUTTON_DISABLED_BORDER = GREY_LIGHT_2;
export const BUTTON_DISABLED_COLOR = GREY_LIGHT;

// Inputs
export const INPUT_BORDER_COLOR = GREY_LIGHT_4;
export const INPUT_BORDER_COLOR_FOCUSED = '#2684ff';
