import { useState } from 'react';
import styles from './TripDetails.module.css';
import { useAppSelector } from '../../store/hooks';
import { formattedTime, formattedDuration } from '../../utils/timeFormatters';

export default function TripDetails() {
  const route = useAppSelector((state) => state.routes.selectedRoute);
  const order = useAppSelector((state) => state.order);

  const [isToOpen, setIsToOpen] = useState(true);
  const [isBackOpen, setIsBackOpen] = useState(true);
  const [isPassengersOpen, setIsPassengersOpen] = useState(true);

  const stringToDate = (
    destination: 'departure' | 'arrival',
    direction: 'from' | 'to'
  ) => {
    return new Date(
      Number(route[destination][direction].datetime) * 1000
    ).toLocaleDateString('ru-RU');
  };

  const arrivalDate = (type: 'departure' | 'arrival') => {
    const date = route[type];
    const startMs = date.to.datetime * 1000;

    return new Date(startMs).toLocaleDateString('ru-RU');
  };

  const adultData = order.prices.find((p) => p.type === 'adult');
  const childData = order.prices.find((p) => p.type === 'child');
  const adultCount = order.departure.seats.filter(
    (seat) => !seat.is_child
  ).length;
  const childCount = order.departure.seats.filter(
    (seat) => seat.is_child
  ).length;

  return (
    <div className={styles['trip-details']}>
      <h3 className={styles['trip-details__title']}>ДЕТАЛИ ПОЕЗДКИ</h3>
      <div
        className={`${styles['trip-details__section']} ${styles['trip-details__section-to']}`}
      >
        <div
          className={styles['trip-details__section-header']}
          onClick={() => setIsToOpen(!isToOpen)}
        >
          <div className={styles['trip-details__header-left']}>
            <img
              className={styles['trip-details__icon-arrow']}
                src={`${process.env.PUBLIC_URL}/assets/images/arrow-to-black.png`}
              alt="Arrow"
            ></img>
            <h1 className={styles['trip-details__section-title']}>Туда</h1>
            <span className={styles['trip-details__section-date']}>
              {stringToDate('departure', 'from')}
            </span>
          </div>
          <div
            className={
              isToOpen
                ? styles['trip-details__btn-minus']
                : styles['trip-details__btn-plus']
            }
          ></div>
        </div>
        {isToOpen && (
          <div className={styles['trip-details__section-content']}>
            <div className={styles['trip-details__info-row']}>
              <span>№ Поезда</span>
              <strong className={styles['trip-details__train-number']}>
                {route.departure.train.name}
              </strong>
            </div>
            <div className={styles['trip-details__info-row']}>
              <span>Название</span>
              <span className={styles['trip-details__text-right']}>
                {route.departure.from.city.name}
                <br />
                {route.departure.to.city.name}
              </span>
            </div>
            <div className={styles['trip-details__route-grid']}>
              <div className={styles['trip-details__route-time-block']}>
                <div className={styles['trip-details__time']}>
                  {' '}
                  {formattedTime('from', route.departure)}
                </div>
                <div className={styles['trip-details__date']}>
                  {stringToDate('departure', 'from')}
                </div>
                <div className={styles['trip-details__city']}>
                  {route.departure.from.city.name}
                </div>
                <div className={styles['trip-details__station']}>
                  {route.departure.from.railway_station_name}
                </div>
              </div>
              <div className={styles['trip-details__center-column']}>
                <div className={styles['trip-details__duration']}>
                  {formattedDuration(route.departure)}
                </div>
                <img
                  className={styles['trip-details__arrow-line']}
                    src={`${process.env.PUBLIC_URL}/assets/images/arrow-back-brightorange.png`}
                  alt="Arrow to"
                />
              </div>
              <div
                className={`${styles['trip-details__route-time-block']} ${styles['trip-details__text-right']}`}
              >
                <div className={styles['trip-details__time']}>
                  {formattedTime('to', route.departure)}
                </div>
                <div className={styles['trip-details__date']}>
                  {arrivalDate('departure')}
                </div>
                <div className={styles['trip-details__city']}>
                  {route.departure.to.city.name}
                </div>
                <div className={styles['trip-details__station']}>
                  {route.departure.to.railway_station_name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${styles['trip-details__section']} ${styles['trip-details__section-back']}`}
      >
        <div
          className={styles['trip-details__section-header']}
          onClick={() => setIsBackOpen(!isBackOpen)}
        >
          <div className={styles['trip-details__header-left']}>
            <img
              className={styles['trip-details__icon-arrow']}
               src={`${process.env.PUBLIC_URL}/assets/images/arrow-back-black.png`}
              alt="Arrow back"
            ></img>
            <h1 className={styles['trip-details__section-title']}>Обратно</h1>
            {route.arrival && (
              <span className={styles['trip-details__section-date']}>
                {stringToDate('arrival', 'from')}
              </span>
            )}
          </div>
          <div
            className={
              isBackOpen
                ? styles['trip-details__btn-minus']
                : styles['trip-details__btn-plus']
            }
          ></div>
        </div>
        {isBackOpen && route.arrival && (
          <div className={styles['trip-details__section-content']}>
            <div className={styles['trip-details__info-row']}>
              <span>№ Поезда</span>
              <strong className={styles['trip-details__train-number']}>
                {route.arrival.train.name}
              </strong>
            </div>
            <div className={styles['trip-details__info-row']}>
              <span>Название</span>
              <span className={styles['trip-details__text-right']}>
                {route.arrival.from.city.name}
                <br />
                {route.arrival.to.city.name}
              </span>
            </div>
            <div className={styles['trip-details__route-grid']}>
              <div className={styles['trip-details__route-time-block']}>
                <div className={styles['trip-details__time']}>
                  {formattedTime('from', route.arrival)}
                </div>
                <div className={styles['trip-details__date']}>
                  {stringToDate('arrival', 'to')}
                </div>
                <div className={styles['trip-details__city']}>
                  {route.arrival.to.city.name}
                </div>
                <div className={styles['trip-details__station']}>
                  {route.arrival.to.railway_station_name}
                </div>
              </div>
              <div className={styles['trip-details__center-column']}>
                <div className={styles['trip-details__duration']}>
                  {formattedDuration(route.arrival)}
                </div>
                <img
                  className={styles['trip-details__arrow-line']}
                 src={`${process.env.PUBLIC_URL}/assets/images/arrow-to-brightorange.png`}
                  alt="Arrow to"
                />
              </div>
              <div
                className={`${styles['trip-details__route-time-block']} ${styles['trip-details__text-right']}`}
              >
                <div className={styles['trip-details__time']}>
                  {formattedTime('to', route.arrival)}
                </div>
                <div className={styles['trip-details__date']}>
                  {stringToDate('arrival', 'from')}
                </div>
                <div className={styles['trip-details__city']}>
                  {route.arrival.from.city.name}
                </div>
                <div className={styles['trip-details__station']}>
                  {route.arrival.from.railway_station_name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${styles['trip-details__section']} ${styles['trip-details__section-passengers']}`}
      >
        <div
          className={styles['trip-details__section-header']}
          onClick={() => setIsPassengersOpen(!isPassengersOpen)}
        >
          <div className={styles['trip-details__header-left']}>
            <img
              className={styles['trip-details__icon-passenger']}
                src={`${process.env.PUBLIC_URL}/assets/images/passenger.png`}
              alt="Passenger"
            ></img>
            <h1 className={styles['trip-details__section-title']}>Пассажиры</h1>
          </div>
          <div
            className={
              isPassengersOpen
                ? styles['trip-details__btn-minus']
                : styles['trip-details__btn-plus']
            }
          ></div>
        </div>
        {isPassengersOpen && (
          <div className={styles['trip-details__section-content']}>
            {adultData && (
              <div className={styles['trip-details__info-row']}>
                <span className={styles['trip-details__muted-text']}>
                  <>{adultCount} Взрослых</>
                </span>
                <span className={styles['trip-details__price-row']}>
                  <>
                    {' '}
                    {adultData?.price}{' '}
                    <span className={styles['trip-details__ruble']}>₽</span>
                  </>
                </span>
              </div>
            )}
            {childData && (
              <div className={styles['trip-details__info-row']}>
                <span className={styles['trip-details__muted-text']}>
                  <>{childCount} Ребенок</>
                </span>
                <span className={styles['trip-details__price-row']}>
                  {' '}
                  <>
                    {childData?.price}{' '}
                    <span className={styles['trip-details__ruble']}>₽</span>
                  </>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles['trip-details__total-block']}>
        <h1 className={styles['trip-details__total-title']}>ИТОГ</h1>
        <span className={styles['trip-details__total-price']}>
          <>
            {' '}
            {(adultData?.price || 0) + (childData?.price || 0)}{' '}
            <span className={styles['trip-details__ruble--large']}>₽</span>
          </>
        </span>
      </div>
    </div>
  );
}
