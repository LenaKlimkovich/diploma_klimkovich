import { BASEURL } from '../../store/store';
import styles from './LastTickets.module.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Route } from '../../store/slices/routesSlice';

export default function LastTickets() {
  const [tickets, setTickets] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastTickets = async () => {
      try {
        const response = await fetch(`${BASEURL}/routes/last`);
        if (!response.ok) {
          throw new Error(
            `Ошибка сервера: ${response.status} ${response.statusText}`
          );
        }
        const data: Route[] = await response.json();
        setTickets(data);
      } catch (err: any) {
        console.error('Ошибка при загрузке последних билетов:', err);
        setError(err.message || 'Не удалось загрузить билеты');
      } finally {
        setLoading(false);
      }
    };

    fetchLastTickets();
  }, []);

  const location = useLocation();
  const page = location.pathname;

  const isTicketsPage = page.includes('tickets') || page.includes('seats');

  if (!isTicketsPage) {
    return null;
  }

  return (
    <div className={styles['tickets__last-tickets']}>
      <h3 className={styles['tickets__last-tickets-title']}>
        последние билеты
      </h3>
      {tickets?.map((ticket, index) => {
        return (
          <div
            key={index}
            className={styles['tickets__last-tickets-container']}
          >
            <div key={index} className={styles['tickets__last-tickets-route']}>
              <div className={styles['tickets__last-tickets-from']}>
                <div className={styles['tickets__last-tickets-city']}>
                  {ticket.departure.from.city.name}
                </div>
                <div className={styles['tickets__last-tickets-station']}>
                  {ticket.departure.from.railway_station_name}
                </div>
              </div>

              <div className={styles['tickets__last-tickets-to']}>
                <div className={styles['tickets__last-tickets-city']}>
                  {ticket.departure.to.city.name}
                </div>
                <div className={styles['tickets__last-tickets-station']}>
                  {ticket.departure.to.railway_station_name}
                </div>
              </div>
            </div>
            <div className={styles['tickets__last-tickets-bottom']}>
              <div className={styles['tickets__last-tickets-amenities']}>
                {(ticket.departure.have_wifi || ticket.arrival?.have_wifi) && (
                  <div
                    className={`${styles['tickets__last-tickets-amenity']} ${styles['have_wifi']}`}
                  ></div>
                )}
                {(ticket.departure.is_express ||
                  ticket.arrival?.is_express) && (
                  <div
                    className={`${styles['tickets__last-tickets-amenity']} ${styles['is_express']}`}
                  ></div>
                )}
                {(ticket.departure.have_air_conditioning ||
                  ticket.arrival?.have_air_conditioning) && (
                  <div
                    className={`${styles['tickets__last-tickets-amenity']} ${styles['have_air_conditioning']}`}
                  ></div>
                )}
              </div>
              <div className={styles['tickets__last-tickets-price']}></div>
              <div className={styles['tickets__last-tickets-price']}>
                от <strong>{ticket.min_price}</strong>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
                  alt="руб."
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
