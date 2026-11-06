import styles from './Pagination.module.css';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setOffSet, fetchRoutes } from '../../store/slices/routesSlice';

export default function Pagination(): React.ReactElement {
  const routeState = useAppSelector((state) => state.routes);
  const dispatch = useAppDispatch();

  const limit = routeState.limit;

  const totalPages = Math.ceil((routeState.total_count ?? 0) / limit);

  const currentPage = Math.floor(routeState.offset / limit) + 1;

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newOffset: number) => {
    dispatch(setOffSet(newOffset));

    dispatch(
      fetchRoutes({
        from_city_id: routeState.fromId,
        to_city_id: routeState.toId,
        date_start: routeState.dateStart,
        limit: limit,
        offset: newOffset,
        have_first_class: routeState.have_first_class,
        have_second_class: routeState.have_second_class,
        have_third_class: routeState.have_third_class,
        have_fourth_class: routeState.have_fourth_class,
        have_wifi: routeState.have_wifi,
        have_express: routeState.have_express,
        price_from: routeState.price_from,
        price_to: routeState.price_to,
      })
    );
  };

  const step = 3;
  const blockIndex = Math.floor((currentPage - 1) / step);

  const startIdx = blockIndex * step;
  const endIdx = startIdx + step;
  const visiblePages = pageNumbers.slice(startIdx, endIdx);

  if (totalPages <= 1) return <></>;

  return (
    <div className={styles.pagination}>
      {/* 1. Кнопка НАЗАД */}
      {currentPage > 1 && (
        <button
          type="button"
          className={`${styles.pagination__item} ${styles.pagination__item_arrow_back}`}
          onClick={() => handlePageChange(routeState.offset - limit)}
        ></button>
      )}

      {/* 2. Цифровые кнопки страниц */}
      {visiblePages.map((pageNumber) => {
        const targetOffset = (pageNumber - 1) * limit;
        if (pageNumber === totalPages) {
          return null;
        }
        return (
          <button
            key={pageNumber}
            type="button"
            className={`${styles.pagination__item} ${
              currentPage === pageNumber ? styles.pagination__item_active : ''
            }`}
            onClick={() => handlePageChange(targetOffset)}
          >
            {pageNumber}
          </button>
        );
      })}
      {currentPage !== totalPages && totalPages - currentPage > 1 && (
        <button type="button" className={styles.pagination__item}>
          ...
        </button>
      )}
      <button
        type="button"
        className={`${styles.pagination__item} ${
          currentPage === totalPages ? styles.pagination__item_active : ''
        }`}
        onClick={() => handlePageChange((totalPages - 1) * limit)}
      >
        {totalPages}
      </button>
      {/* 3. Кнопка ВПЕРЕД */}
      {currentPage < totalPages && currentPage !== totalPages && (
        <button
          type="button"
          className={`${styles.pagination__item} ${styles.pagination__item_arrow_to}`}
          onClick={() => handlePageChange(routeState.offset + limit)}
        ></button>
      )}
    </div>
  );
}
