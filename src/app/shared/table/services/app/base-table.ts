import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

import { CurrentPageData, PaginationData } from '@app/shared/table/interfaces';
import { BaseAPI } from '../api/abstract-api.class';

export class BasicTableService<
  A extends { id: number },
  B extends { data: any; paginationData: PaginationData },
  T extends BaseAPI<B>
> {
  private selectedRows: A[] = [];

  private currentPageData: CurrentPageData = {
    currentPageURL: null,
    pageSize: 10,
    sort: {
      active: '',
      direction: '',
    },
  };

  protected readonly currentPageData$ = new BehaviorSubject<CurrentPageData>(
    this.currentPageData
  );

  protected readonly update$ = new Subject<void>();

  protected allPaginatedData$: Observable<B | null> = merge(
    this.update$,
    this.currentPageData$
  ).pipe(
    switchMap(() => {
      return this.service
        .getTableData(this.currentPageData$.value)
        .pipe(startWith(null));
    }),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  readonly data$: Observable<A[] | null> = this.allPaginatedData$.pipe(
    map((res) => res?.data || null)
  );

  readonly paginationData$: Observable<PaginationData | null> =
    this.allPaginatedData$.pipe(map((res) => res?.paginationData || null));

  readonly loading$: Observable<boolean> = this.allPaginatedData$.pipe(
    map((res) => res === null)
  );

  readonly selectedRows$ = new BehaviorSubject<A[]>([]);

  constructor(protected service: T) {}

  updatePage(): void {
    this.update$.next();
  }

  setCurrentPageURL(currentPageURL: string | null): void {
    this.currentPageData.currentPageURL = currentPageURL;
    this.currentPageData$.next(this.currentPageData);
  }

  setCurrentPageSize(pageSize: number): void {
    this.currentPageData.pageSize = pageSize;
    this.currentPageData.currentPageURL = null;
    this.currentPageData$.next(this.currentPageData);
  }

  setCurrentSort(currentSort: Sort): void {
    this.currentPageData.sort = currentSort;
    this.currentPageData$.next(this.currentPageData);
  }

  updateSelectedRows(row: A): void {
    const rowIndex = this.selectedRows.findIndex((x) => x.id === row.id);
    if (rowIndex >= 0) {
      this.selectedRows.splice(rowIndex, 1);
    } else {
      this.selectedRows.push(row);
    }
    this.selectedRows$.next(this.selectedRows);
  }
}
