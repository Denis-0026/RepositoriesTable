import { Injectable } from '@angular/core';
import { IssueItem, IssuesListData } from '@app/shared/table/interfaces';
import {
  BasicTableService,
  IssuesAPIService,
} from '@app/shared/table/services';

@Injectable({ providedIn: 'any' })
export class IssuesListService extends BasicTableService<
  IssueItem,
  IssuesListData,
  IssuesAPIService
> {
  constructor(private issuesAPIService: IssuesAPIService) {
    super(issuesAPIService);
  }
}
