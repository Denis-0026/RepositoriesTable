import { Injectable } from '@angular/core';
import {
  RepositoriesListData,
  RepositoryItem,
} from '@app/shared/table/interfaces';
import {
  BasicTableService,
  MicrosoftRepositoriesAPIService,
} from '@app/shared/table/services';

@Injectable({ providedIn: 'any' })
export class MicrosoftRepositoriesService extends BasicTableService<
  RepositoryItem,
  RepositoriesListData,
  MicrosoftRepositoriesAPIService
> {
  constructor(
    private microsoftRepositoriesAPIService: MicrosoftRepositoriesAPIService
  ) {
    super(microsoftRepositoriesAPIService);
  }
}
