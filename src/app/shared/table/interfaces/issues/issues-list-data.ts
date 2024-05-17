import { PaginationData } from '../pagination-data';
import { IssueItem } from './issue-item';

export interface IssuesListData {
  data: IssueItem[] | null;
  paginationData: PaginationData;
}
