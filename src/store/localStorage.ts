import { Customer } from '../types/customer';

type LocalStorageKey = 'customer';

type LocalStorageValue<T extends LocalStorageKey> = T extends 'customer' ? Customer : never;

class LocalStorage {
  public static getItem<T extends LocalStorageKey>(key: T): LocalStorageValue<T> | null {
    const data = localStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return data;
  }

  public static setItem<T extends LocalStorageKey>(key: T, value: LocalStorageValue<T>): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
