import { useState } from 'react';
import { PaginationWithUpdate } from './Pagination.model';

/** In the hook, we just need to 'subscribe' an updateFn
 * to generate a rerender when the page is updated */
export const usePagination = ({ limit, total, initialPage = 1 }: Props) => {
  const update = useForceUpdate();

  const updateFn = () => {
    update();
  };

  const paginationInstance = new PaginationWithUpdate({
    limit,
    total,
    initialPage,
  });

  paginationInstance.setUpdateFn(updateFn);

  const [pagination] = useState(paginationInstance);

  return pagination;
};

const useForceUpdate = () => {
  const [, setUpdate] = useState(true);

  return () => setUpdate((s) => !s);
};

type Props = { limit: number; total: number; initialPage?: number };
