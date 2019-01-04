import { FONT_L } from '../../constants/styles-fonts';
import { MAX_DESKTOP_L } from '../../constants/styles-media-queries';
import { APP_BACKGROUND } from '../../constants/styles-skin';

const getGoogleFonts = () => {
  const style = document.createElement('style');
  style.innerHTML = "@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');";
  return style;
};

const getCSSAnimations = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  return style;
};

const getResetStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      box-sizing: border-box;
      list-style: none;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    html,
    body,
    #app-wrapper {
      height: 100%;
    }

    body {
      color: #303030;
      font-family: 'Open Sans', sans-serif;
      font-size: ${FONT_L};
      font-weight: 400;
      line-height: 1.5em;
      min-width: 320px;
      overflow: hidden;
      overscroll-behavior-y: contain;
    }
  `;
  return style;
};

const getAppStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    #app-wrapper {
      background-color: ${APP_BACKGROUND};
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 2220px;

      ${MAX_DESKTOP_L} {
        background-image: none !important;
      }
    }
  `;
  return style;
};

const getRadarChartStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .scale {
      fill: #95bec4;
      stroke: #009cb3;
      stroke-width: 2;
    }

    .axis {
      stroke: #009cb3;
      stroke-width: 1;
    }

    .shape {
      fill-opacity: 0.7;
      stroke: #fff;
      stroke-width: 1;
    }

    .caption {
      fill: #fff;
      font-weight: 700;
      font-size: 18px;
    }
  `;
  return style;
};

const getCustomStyles = () => [
  getGoogleFonts(),
  getCSSAnimations(),
  getResetStyles(),
  getAppStyles(),
  getRadarChartStyles(),
];
export default getCustomStyles;
