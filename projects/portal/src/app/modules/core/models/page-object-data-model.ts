interface PagedObjectData<T> {
    data: T;
    meta: {
      currentPage: number;
      perPage: number;
      total: number;
    };
  }
  