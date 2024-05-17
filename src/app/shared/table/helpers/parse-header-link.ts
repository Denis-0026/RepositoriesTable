import { Pages } from '../enums';
import { PaginationData } from '../interfaces';

export function parseHederLink(link: string | null): PaginationData {
  return {
    firstPageURL: parseHederLinkItem(link, Pages.First),
    prevPageURL: parseHederLinkItem(link, Pages.Prev),
    nextPageURL: parseHederLinkItem(link, Pages.Next),
    lastPageURL: parseHederLinkItem(link, Pages.Last),
  };
}

function parseHederLinkItem(
  link: string | null,
  position: string
): string | null {
  const pattern = new RegExp(`(?<=<)([\\S]*)(?=>; rel="${position}")`, 'i');
  const url = link ? link.match(pattern) : null;
  return url ? url[0] : null;
}
