import { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Outlet } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import TicketsFilter from '../../components/TicketsFilter/TicketsFilter';
import LastTickets from '../../components/LastTickets/LastTickets';
import styles from './TicketsPage.module.css';

export const TicketsPage = (): ReactElement => {
  const { loading } = useAppSelector((state) => state.routes);

  return (
    <>
      <BreadCrumbs />
      <div className={styles.tickets}>
        {loading && (
          <div className={styles.tickets__loadingOverlay}>
            <p className={styles.tickets__loadingText}>идет поиск</p>
          </div>
        )}
        <aside className={styles.tickets__aside}>
          <TicketsFilter />
          <LastTickets />
        </aside>
        <div className={styles.tickets__container}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
