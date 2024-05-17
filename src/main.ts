import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/root/root.config';
import { RootComponent } from './app/root/root.component';
import { enableProdMode } from '@angular/core';
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(RootComponent, appConfig).catch((err) =>
  console.error(err)
);
