export class Pagination {
  constructor(public page: number, public pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;
  }
}
