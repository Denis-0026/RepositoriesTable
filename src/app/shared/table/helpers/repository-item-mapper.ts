import { RepositoryItem } from '../interfaces';

export function repositoryItemMapper(
  data: any[] | null
): RepositoryItem[] | null {
  if (data) {
    return data.map((item: any) => {
      return {
        id: item.id,
        full_name: item.full_name,
        language: item.language,
        pushed: item.pushed_at,
        archived: item.archived,
        url: item.html_url,
        issues_url: item.issues_url ? item.issues_url.slice(0, -9) : '',
      };
    });
  }
  return null;
}
