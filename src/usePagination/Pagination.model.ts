export class PaginationModel {
  limit: number;
  total: number;
  updateFn: (x: any) => void;
  private page: number;

  constructor({ limit, total, initialPage = 0, updateFn }: Params) {
    this.limit = limit;
    this.total = total;
    this.page = initialPage;
    this.setPage = this.setPage.bind(this);
    this.updateFn = updateFn;
  }

  get pages() {
    return Array.from({ length: this.pagesAmount }).map((_, i) => i + 1);
  }

  get pagesAmount() {
    return Math.ceil(this.total / this.limit);
  }

  get activePage() {
    return this.page;
  }

  setPage(page: number) {
    if (page < 1 || page > this.total) return;

    this.page = page;
    this.updateFn(this);
  }

  next() {
    if (this.activePage === this.total) return;

    const nextPage = this.page + 1;
    this.setPage(nextPage);
  }

  previous() {
    if (this.activePage === 1) return;

    const prevOffset = this.page - 1;
    this.setPage(prevOffset);
  }
}

type Params = {
  /** Items per page */
  limit: number;
  /** Number of items */
  total: number;
  /** Initial page  */
  initialPage?: number;
  updateFn: (x: any) => void;
};
