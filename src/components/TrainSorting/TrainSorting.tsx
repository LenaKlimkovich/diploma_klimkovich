import React, { useState } from 'react';
import styles from './TrainSorting.module.css';
import { useAppSelector } from '../../store/hooks';
import { setSortBy, setLimit, setOffSet } from '../../store/slices/routesSlice';
import { SortOption } from '../../store/slices/routesSlice';
import { useAppDispatch } from '../../store/hooks';

type PerPageOption = number;

interface OptionItem {
  value: SortOption;
  label: string;
}

const sortingOptions: OptionItem[] = [
  { value: 'time', label: 'времени' },
  { value: 'value', label: 'стоимости' },
  { value: 'duration', label: 'длительности' },
];

const perPageOptions: PerPageOption[] = [5, 10, 20];

export default function TrainSorting(): React.ReactElement {
  const dispatch = useAppDispatch();

  const routes = useAppSelector((state) => state.routes);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentSort = routes.sortBy;
  const currentLimit = routes.limit;

  const currentLabel =
    sortingOptions.find((opt) => opt.value === currentSort)?.label || '';

  const handleSelectSorting = (value: SortOption) => {
    dispatch(setOffSet(0));
    dispatch(setSortBy(value));
    setIsOpen(false);
  };

  const handleSelectPages = (value: PerPageOption) => {
    dispatch(setOffSet(0));
    dispatch(setLimit(value));
  };

  return (
    <>
      <section className={styles.tickets__info}>
        <div className={styles.tickets__found}>
          найдено {routes.total_count}
        </div>
        <div className={styles.tickets__options}>
          <div className={styles.tickets__sorting}>
            <span className={styles.sorting__label}>сортировать по:</span>
            <div className={styles.dropdown}>
              <button
                type="button"
                className={styles.dropdown__button}
                onClick={() => setIsOpen(!isOpen)}
              >
                {currentLabel}
              </button>
              {isOpen && (
                <ul className={styles.dropdown__list}>
                  {sortingOptions.map((opt) => (
                    <li key={opt.value} className={styles.dropdown__item}>
                      <button
                        type="button"
                        className={`${styles.dropdown__item_btn} ${
                          currentSort === opt.value
                            ? styles.dropdown__item_btn_active
                            : ''
                        }`}
                        onClick={() => handleSelectSorting(opt.value)}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.ticketsperpage}>
            <span className={styles.ticketsperpage__label}>показывать по:</span>
            <div className={styles.ticketsperpage__container}>
              {perPageOptions.map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`${styles.ticketsperpage__option} ${
                    currentLimit === page
                      ? styles.ticketsperpage__option_active
                      : ''
                  }`}
                  onClick={() => handleSelectPages(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
