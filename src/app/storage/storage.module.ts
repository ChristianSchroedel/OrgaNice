import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class StorageModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [
        StorageService
      ]
    }
  }
}
