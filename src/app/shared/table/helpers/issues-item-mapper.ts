import { IssueItem } from '../interfaces';

export function issueItemMapper(data: any[] | null): IssueItem[] | null {
  if (data) {
    return data.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        body: item.body,
        created_at: item.created_at,
      };
    });
  }
  return null;
}
