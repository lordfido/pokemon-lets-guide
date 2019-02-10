import { CookieName } from '../../constants/cookies';

/**
 * Get the value of a cookie
 */
export const getCookie = (name: CookieName) => {
  if (typeof document === 'undefined' || !document.cookie) {
    return undefined;
  }

  const allCookies = document.cookie.split(';').map((c: string) => {
    const cookie = c.split('=');

    return {
      name: cookie[0] ? cookie[0].trim() : '',
      value: cookie[1] ? cookie[1].trim() : '',
    };
  });

  const selectedCookie = allCookies.find(c => c.name === name);

  return selectedCookie ? selectedCookie.value : undefined;
};

/**
 * Set a cookie
 */
export const setCookie = (name: CookieName, value: string) => {
  document.cookie = `${name}=${value}`;
};
