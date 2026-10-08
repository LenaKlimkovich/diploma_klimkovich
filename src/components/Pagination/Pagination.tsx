import styles from './Pagination.module.css';
import { useState } from 'react';

export default function Pagination(): React.ReactElement {
  return (
    <div className={styles.pagination}>
      <div
        className={`${styles.pagination__item} ${styles.pagination__item_arrow_back}`}
      ></div>
      <div
        className={`${styles.pagination__item} ${styles.pagination__item_one} ${styles.pagination__item_one_open}`}
      >
        1
      </div>
      <div
        className={`${styles.pagination__item} ${styles.pagination__item_two}`}
      >
        2
      </div>
      <div
        className={`${styles.pagination__item} ${styles.pagination__item_three}`}
      >
        3
      </div>
      <div
        className={`${styles.pagination__item} ${styles.pagination__item_arrow_to}`}
      ></div>
    </div>
  );
}
