import { Observable } from 'rxjs';
import { CurrentPageData } from '../../interfaces';

export abstract class BaseAPI<T> {
  constructor() {}
  abstract getTableData(
    currentPageData?: CurrentPageData
  ): Observable<T | null>;
}
