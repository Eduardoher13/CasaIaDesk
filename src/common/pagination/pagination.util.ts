export const PAGINATION_DEFAULT_LIMIT = 10;
export const PAGINATION_MAX_LIMIT = 100;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export function toPaginatedResult<T>(
  data: T[],
  total: number,
  limit: number,
  offset: number,
): PaginatedResult<T> {
  return { data, total, limit, offset };
}
