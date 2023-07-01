import { useState } from 'react';
import { PaginationModel } from './Pagination.model';

export const usePagination = ({ limit, total, initialPage = 1 }: Props) => {
  const updateFn = (instance: PaginationModel) => {
    setPagination(
      new PaginationModel({
        limit,
        total,
        initialPage: instance.activePage,
        updateFn,
      })
    );
  };

  const [pagination, setPagination] = useState(
    new PaginationModel({
      limit,
      total,
      initialPage,
      updateFn,
    })
  );

  return pagination;
};

type Props = { limit: number; total: number; initialPage?: number };
