import { Sort } from '@angular/material/sort';

export interface CurrentPageData {
  currentPageURL: string | null;
  pageSize: number;
  sort: Sort;
}
