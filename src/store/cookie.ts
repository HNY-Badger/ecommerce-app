type CookieKey = 'accessToken' | 'refreshToken' | 'customerID';

export default class Cookie {
  public static getCookie(key: CookieKey): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  public static setCookie(key: CookieKey, value: string, expires?: Date): void {
    let cookie = `${key}=${value};path=/;`;
    if (expires) {
      cookie += `expires=${expires.toUTCString()}`;
    }
    document.cookie = cookie;
  }

  public static removeCookie(key: CookieKey): void {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}
