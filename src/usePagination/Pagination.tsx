import * as React from 'react';
import { usePagination } from '../usePagination/usePagination';

export const Pagination: React.FC = () => {
  const pagination = usePagination({ limit: 5, total: 10, initialPage: 1 });

  return (
    <div>
      <div> Active Page: {pagination.activePage} </div>
      <div> Pages Amount: {pagination.pagesAmount} </div>
      <div>
        <button onClick={() => pagination.previous()}>Back</button>
        <button onClick={() => pagination.next()}>Next</button>
      </div>
    </div>
  );
};
