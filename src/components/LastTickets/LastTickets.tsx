import { use } from 'react';
import styles from './LastTickets.module.css';
import { useLocation } from 'react-router-dom';

export default function LastTickets() {
  const location = useLocation();
  const page = location.pathname.split('/').filter(Boolean).pop();

  const isTicketsPage = page === 'tickets' || page === 'seats';

  if (!isTicketsPage) {
    return null;
  }

  return (
    <div className={styles['tickets__last-tickets']}>
      <h3 className={styles['tickets__last-tickets-title']}>
        последние билеты
      </h3>

      <div className={styles['tickets__last-tickets-container']}>
        <div className={styles['tickets__last-tickets-route']}>
          <div className={styles['tickets__last-tickets-from']}>
            <div className={styles['tickets__last-tickets-city']}>
              Санкт-Петербург
            </div>
            <div className={styles['tickets__last-tickets-station']}>
              Курский <br />
              вокзал
            </div>
          </div>

          <div className={styles['tickets__last-tickets-to']}>
            <div className={styles['tickets__last-tickets-city']}>Самара</div>
            <div className={styles['tickets__last-tickets-station']}>
              Московский <br />
              вокзал
            </div>
          </div>
        </div>
        <div className={styles['tickets__last-tickets-bottom']}>
          <div className={styles['tickets__last-tickets-amenities']}></div>

          <div className={styles['tickets__last-tickets-price']}>
            от <strong>2 500</strong>
            <img src="/assets/images/ruble.png" alt="руб." />
          </div>
        </div>
      </div>
    </div>
  );
}
