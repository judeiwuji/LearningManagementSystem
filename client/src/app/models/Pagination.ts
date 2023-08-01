export interface Pagination<T> {
  page: number;
  totalPages: number;
  results: T[];
}
