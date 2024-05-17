import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { MICROSOFT_REPOSITORIES_BASE_URL } from '@app/shared/tokens';
import {
  CurrentPageData,
  RepositoriesListData,
  RepositoryItem,
} from '@app/shared/table/interfaces';
import {
  parseHederLink,
  repositoryItemMapper,
} from '@app/shared/table/helpers';

@Injectable({ providedIn: 'root' })
export class MicrosoftRepositoriesAPIService {
  constructor(
    private httpClient: HttpClient,
    @Inject(MICROSOFT_REPOSITORIES_BASE_URL)
    private readonly microsoftRepositoriesBaseURL: string
  ) {}

  getTableData(
    currentPageData: CurrentPageData
  ): Observable<RepositoriesListData | null> {
    let per_page: string = currentPageData.pageSize.toString();

    let url = currentPageData.currentPageURL
      ? currentPageData.currentPageURL
      : this.microsoftRepositoriesBaseURL;

    let params: HttpParams = new HttpParams()
      .set('sort', currentPageData.sort.active)
      .set('direction', currentPageData.sort.direction)
      .set('per_page', per_page);

    return this.httpClient
      .get<RepositoryItem[]>(`${url}`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          console.log(res);
          return {
            data: repositoryItemMapper(res?.body),
            paginationData: parseHederLink(res?.headers.get('Link')),
          };
        })
      );
  }
}
