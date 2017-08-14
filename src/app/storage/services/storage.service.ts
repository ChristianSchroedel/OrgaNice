import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = this.prepareStorage();
  }

  public set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    const value = this.storage.getItem(key);

    return value ? JSON.parse(value) : undefined;
  }

  private prepareStorage(): Storage {
    return window.localStorage;
  }
}
