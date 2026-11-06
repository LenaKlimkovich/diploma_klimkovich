import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './TrainTicket.module.css';
import { Route } from '../../store/slices/routesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSeats } from '../../store/slices/seatsSlice';
import { setSelectedRoute } from '../../store/slices/routesSlice';

interface TrainTicketProps {
  route: Route;
}

type CategoryLabel = 'first' | 'second' | 'third' | 'fourth';

const categoryNames: Record<CategoryLabel, string> = {
  fourth: 'Сидячий',
  third: 'Плацкарт',
  second: 'Купе',
  first: 'Люкс',
};

interface SeatPriceRowProps {
  category: CategoryLabel;
  route: Route;
}

function SeatPriceRow({ category, route }: SeatPriceRowProps) {
  // У каждой строки теперь СВОЙ СОБСТВЕННЫЙ стейт открытия
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const classData = route.departure.price_info?.[category];
  const categoryInfo = route.available_seats_info?.[category];

  if (!classData || !categoryInfo) return null;

  const prices = [
    classData.bottom_price,
    classData.side_price,
    classData.top_price,
  ];
  const validPrices = prices.filter((p): p is number => typeof p === 'number');
  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

  return (
    <div className={styles.ticket__price_row}>
      <span
        className={styles.ticket__seat_type}
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
      >
        {categoryNames[category]}
      </span>

      {isTooltipOpen && (
        <div
          className={styles.ticket__seat_tooltips}
          onClick={() => setIsTooltipOpen(false)}
        >
          {' '}
          <div className={styles.tooltip__triangle}></div>
          {classData.top_price !== undefined && (
            <div className={styles.ticket__seat_tooltip}>
              <span className={styles.ticket__seat_shelf}>верхние</span>
              <span className={styles.ticket__seat_price}>
                <strong>{classData.top_price}</strong>
                <img
                  className={styles.ticket__seat_rubble}
                  src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
                  alt="руб"
                />
              </span>
            </div>
          )}
          {classData.bottom_price !== undefined && (
            <div className={styles.ticket__seat_tooltip}>
              <span className={styles.ticket__seat_shelf}>нижние</span>
              <span className={styles.ticket__seat_price}>
                <strong>{classData.bottom_price}</strong>
                <img
                  className={styles.ticket__seat_rubble}
                  src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
                  alt="руб"
                />
              </span>
            </div>
          )}
          {classData.side_price !== undefined && (
            <div className={styles.ticket__seat_tooltip}>
              <span className={styles.ticket__seat_shelf}>боковые</span>
              <span className={styles.ticket__seat_price}>
                <strong>{classData.side_price}</strong>
                <img
                  className={styles.ticket__seat_rubble}
                  src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
                  alt="руб"
                />
              </span>
            </div>
          )}
        </div>
      )}

      <span className={styles.ticket__seat_count}>{categoryInfo}</span>

      <span className={styles.ticket__seat_price}>
        от <strong>{minPrice}</strong>
        <img
          className={styles.ticket__seat_rubble}
          src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
          alt="руб"
        />
      </span>
    </div>
  );
}

export default function TrainTicket({
  route,
}: TrainTicketProps): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const page = location.pathname;

  const trainTime = (
    type: 'departure' | 'arrival',
    time: 'datetime' | 'duration',
    destination?: 'from' | 'to'
  ): string => {
    const currentRoute = route[type];
    if (!currentRoute) return '';

    if (time === 'duration') {
      const duration = currentRoute.duration;
      const days = Math.floor(duration / 86400);
      const hours = Math.floor((duration % 86400) / 3600);
      const minutes = Math.floor((duration % 3600) / 60);

      const formattedHours = String(hours).padStart(2, '0');
      let formattedMinutes = String(minutes).padStart(2, '0');

      if (days > 0) {
        return `${days}д.${formattedHours}ч.${formattedMinutes}м.`;
      }
      if (minutes === 0) {
        return `${formattedHours}ч.`;
      }
      return `${formattedHours}ч.${formattedMinutes}м.`;
    }

    if (time === 'datetime' && destination) {
      const currentPoint = currentRoute[destination];
      if (!currentPoint) return '';

       const date = new Date(currentPoint.datetime * 1000);
  
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
  }
   return ''; 
}

  const isTicketsPage = page.includes('tickets') || page.includes('seats');
  const isCheckPage = page.includes('check');

  if (route.departure.train.name.includes('undefined')) {
    route.departure.train.name.replace('undefined', '');
  }

  const handleChooseSeats = () => {
    navigate('/tickets/seats');
    dispatch(setSelectedRoute(route));
    dispatch(
      fetchSeats({
        _id: route.departure._id,
        direction: 'departure',
      })
    );

    if (route.arrival) {
      dispatch(
        fetchSeats({
          _id: route.arrival._id,
          direction: 'arrival',
        })
      );
    }
  };

  return (
    <div
      className={`${styles.ticket} ${isCheckPage ? styles.ticket_check : ''}`}
    >
      {/* ЛЕВАЯ ЧАСТЬ: Информация о поезде */}
      <div className={styles.ticket__left}>
        <div className={styles.ticket__icon}></div>
        <div className={styles.ticket__train_number}>
          {route.departure.train.name}
        </div>
        <div className={styles.ticket__route_cities}>
          {route.departure.from.city.name} → <br />
          {route.departure.to.city.name}
        </div>
      </div>
      <div className={styles.ticket__center}>
        {/* Рейс ТУДА */}
        <div className={styles.ticket__route_row}>
          {/* 1. Блок ОТПРАВЛЕНИЯ  */}
          <div className={styles.ticket__time_block}>
            <div className={styles.ticket__time}>
              {trainTime('departure', 'datetime', 'from')}
            </div>
            <div className={styles.ticket__city}>
              {route.departure.from.city.name}
            </div>
            <div className={styles.ticket__station}>
              {route.departure.from.railway_station_name}
            </div>
          </div>
          <div className={styles.ticket__duration_block}>
            <span className={styles.ticket__duration_text}>
              {trainTime('departure', 'duration')}
            </span>
            <img
              className={styles.ticket__arrow}
              src={`${process.env.PUBLIC_URL}/assets/images/arrow-to.png`}
              alt="Arrow"
            />
          </div>
          <div className={styles.ticket__time_block}>
            <div className={styles.ticket__time}>
              {trainTime('departure', 'datetime', 'to')}
            </div>
            <div className={styles.ticket__city}>
              {route.departure.to.city.name}
            </div>
            <div className={styles.ticket__station}>
              {route.departure.to.railway_station_name}
            </div>
          </div>
        </div>

        {/* Рейс ОБРАТНО (Рендерится только если в билете есть обратный поезд) */}
        {route.arrival && (
          <div className={styles.ticket__route_row}>
            <div className={styles.ticket__time_block}>
              <div className={styles.ticket__time}>
                {trainTime('arrival', 'datetime', 'to')}
              </div>
              <div className={styles.ticket__city}>
                {route.arrival.to.city.name}
              </div>
              <div className={styles.ticket__station}>
                {route.arrival.to.railway_station_name}
              </div>
            </div>

            <div className={styles.ticket__duration_block}>
              <span className={styles.ticket__duration_text}>
                {trainTime('arrival', 'duration')}
              </span>
              <img
                className={styles.ticket__arrow_back}
                src={`${process.env.PUBLIC_URL}/assets/images/arrow-back.png`}
                alt="Arrow"
              />
            </div>

            <div className={styles.ticket__time_block}>
              <div className={styles.ticket__time}>
                {trainTime('arrival', 'datetime', 'from')}
              </div>
              <div className={styles.ticket__city}>
                {route.arrival.from.city.name}
              </div>
              <div className={styles.ticket__station}>
                {route.arrival.from.railway_station_name} <span>вокзал</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.ticket__right}>
        <div className={styles.ticket__prices_list}>
          <SeatPriceRow category="fourth" route={route} />
          <SeatPriceRow category="third" route={route} />
          <SeatPriceRow category="second" route={route} />
          <SeatPriceRow category="first" route={route} />
        </div>

        <div className={styles['ticket__amenities']}>
          {(route.departure.have_wifi || route.arrival?.have_wifi) && (
            <div
              className={`${styles['ticket__amenity']} ${styles['have_wifi']}`}
            ></div>
          )}
          {(route.departure.is_express || route.arrival?.is_express) && (
            <div
              className={`${styles['ticket__amenity']} ${styles['is_express']}`}
            ></div>
          )}
          {(route.departure.have_air_conditioning ||
            route.arrival?.have_air_conditioning) && (
            <div
              className={`${styles['ticket__amenity']} ${styles['have_air_conditioning']}`}
            ></div>
          )}
        </div>

        {isTicketsPage && !isCheckPage ? (
          <button
            type="button"
            className={styles.ticket__btn}
            onClick={handleChooseSeats}
          >
            Выбрать места
          </button>
        ) : (
          <button
            type="button"
            className={styles.ticket__btn_change}
            onClick={() => navigate('/tickets')}
          >
            Изменить
          </button>
        )}
      </div>
    </div>
  );
}
