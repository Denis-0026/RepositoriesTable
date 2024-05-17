import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentPageData, IssueItem, IssuesListData } from '../../interfaces';
import { Observable, map, of } from 'rxjs';
import { issueItemMapper, parseHederLink } from '../../helpers';

@Injectable({ providedIn: 'root' })
export class IssuesAPIService {
  private lastURL = '';
  constructor(private httpClient: HttpClient) {}
  getTableData(
    currentPageData: CurrentPageData
  ): Observable<IssuesListData | null> {
    let per_page: string = currentPageData.pageSize.toString();

    let params: HttpParams = new HttpParams().set('per_page', per_page);

    console.log(currentPageData);

    if (!currentPageData.currentPageURL)
      currentPageData.currentPageURL = this.lastURL;

    this.lastURL = currentPageData.currentPageURL;
    return this.httpClient
      .get<IssueItem[]>(`${currentPageData.currentPageURL}`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          console.log(res);
          return {
            data: issueItemMapper(res?.body),
            paginationData: parseHederLink(res?.headers.get('Link')),
          };
        })
      );
  }
}
