type CookieKey = 'accessToken' | 'refreshToken';

class Cookie {
  public static getCookie(key: CookieKey): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  public static setCookie(key: CookieKey, value: string, expiresMilisec?: number): void {
    let cookie = `${key}=${value};path=/;`;
    if (expiresMilisec) {
      const expireDate = new Date(new Date().getTime() + expiresMilisec);
      cookie += `expires=${expireDate.toUTCString()}`;
    }
    document.cookie = cookie;
  }

  public static removeCookie(key: CookieKey): void {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}

export default Cookie;
