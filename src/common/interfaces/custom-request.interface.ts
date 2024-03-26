interface PaginationData<T> {
  meta: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  };
  data: T;
}
