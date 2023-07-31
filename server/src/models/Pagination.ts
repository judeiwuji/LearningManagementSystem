export default class Pagination {
  startIndex = 0;
  endIndex = 0;

  constructor(public page = 1, public pageSize = 20) {
    this.startIndex = (page - 1) * pageSize;
    this.endIndex = page * pageSize;
  }

  totalPages(totalItems: number) {
    return Math.ceil(totalItems / this.pageSize);
  }
}
