export interface RepositoryItem {
  id: number;
  full_name: string;
  language: string;
  pushed: Date;
  archived: boolean;
  url: string;
  issues_url: string;
}
