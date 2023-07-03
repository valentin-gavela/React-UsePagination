export class PaginationModel {
  itemsPerPage: number;
  totalItems: number;
  private page: number;

  constructor({ limit, total, initialPage = 0 }: Params) {
    this.itemsPerPage = limit;
    this.totalItems = total;
    this.page = initialPage;
    this.setPage = this.setPage.bind(this);
  }

  get pages() {
    return Array.from({ length: this.pagesAmount }).map((_, i) => i + 1);
  }

  get pagesAmount() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get activePage() {
    return this.page;
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalItems) return;

    this.page = page;
  }

  next() {
    if (this.activePage === this.totalItems) return;

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
};

/**
 * To implement PaginationModel in a React hook, we can register
 * an updateFn to force a state update when the method setPage is called.
 */
export class PaginationWithUpdate extends PaginationModel {
  private updateFn: (instance: any) => void;

  constructor(params: Params) {
    super(params);
  }

  override setPage(page: number) {
    super.setPage(page);
    this.updateFn(this);
  }

  setUpdateFn(updateFn: (instance: PaginationModel) => void) {
    this.updateFn = updateFn;
  }
}
