import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom'; // Импортируем Outlet
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import TicketsFilter from '../../components/TicketsFilter/TicketsFilter';
import LastTickets from '../../components/LastTickets/LastTickets';
import styles from './TicketsPage.module.css';

export const TicketsPage = (): ReactElement => {
  return (
    <>
      <BreadCrumbs />
      <div className={styles.tickets}>
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
