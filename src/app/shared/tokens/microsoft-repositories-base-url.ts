import { InjectionToken } from '@angular/core';
import { environment } from '@environments/environment';

export const MICROSOFT_REPOSITORIES_BASE_URL = new InjectionToken<string>(
  'Microsoft Repositories Base URL',
  {
    factory: () => environment.microsoftRepositoriesBaseURL,
  }
);
