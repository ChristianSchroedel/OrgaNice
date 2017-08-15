import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor(private electronService: ElectronService) {
    this.storage = window.localStorage;
  }

  public set(key: string, value: any) {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.sendSync('write-data', key, value);
    } else {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  public get(key: string): any {
    if (this.electronService.isElectronApp) {
      return this.electronService.ipcRenderer.sendSync('read-data', key);
    } else {
      const result = this.storage.getItem(key);

      return result ? JSON.parse(result) : undefined;
    }
  }
}
