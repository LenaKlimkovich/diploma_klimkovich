import { useState } from 'react';
import styles from './TrainSorting.module.css';

type SortOption = 'time' | 'price' | 'duration';
type PerPageOption = number;

interface OptionItem {
  value: SortOption;
  label: string;
}

const sortingOptions: OptionItem[] = [
  { value: 'time', label: 'времени' },
  { value: 'price', label: 'стоимости' },
  { value: 'duration', label: 'длительности' },
];

const perPageOptions: PerPageOption[] = [5, 10, 20];

export default function TrainSorting(): React.ReactElement {
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [perPage, setPerPage] = useState<PerPageOption>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentLabel =
    sortingOptions.find((opt) => opt.value === sortBy)?.label || '';

  const handleSelectSorting = (value: SortOption) => {
    setSortBy(value);
    setIsOpen(false);
  };

  const handleSelectPages = (value: PerPageOption) => {
    setPerPage(value);
  };

  return (
    <>
      <section className={styles.tickets__info}>
        <div className={styles.tickets__found}>найдено 20</div>
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
                          sortBy === opt.value
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
                    perPage === page ? styles.ticketsperpage__option_active : ''
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
