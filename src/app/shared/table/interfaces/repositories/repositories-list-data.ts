import { PaginationData } from '../pagination-data';
import { RepositoryItem } from './repository-item';

export interface RepositoriesListData {
  data: RepositoryItem[] | null;
  paginationData: PaginationData;
}
