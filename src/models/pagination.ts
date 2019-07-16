import { PaginationInterface } from 'src/interfaces';

export class Pagination {
  activePage: number;
  usersPerPage: number;
  usersCount: number;
  pagesCount: number;

  constructor({ page, per_page, total, total_pages }: PaginationInterface) {
    this.activePage = page;
    this.usersPerPage = per_page;
    this.usersCount = total;
    this.pagesCount = total_pages;
  }
}
