import styles from './TicketsFilter.module.css';
import TicketDates from '../TicketDates/TicketDates';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState, useEffect } from 'react';
import TimeFilter from '../TimeFilter/TimeFilter';
import { useLocation } from 'react-router-dom';
import TripDetails from '../TripDetails/TripDetails';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateField,
  setPriceRange,
  toggleFilter,
  fetchRoutes,
} from '../../store/slices/routesSlice';

const compartment = `${process.env.PUBLIC_URL}/assets/images/compartment.svg`;
const reserved = `${process.env.PUBLIC_URL}/assets/images/reserved-seat.svg`;
const sitting = `${process.env.PUBLIC_URL}/assets/images/sitting-passenger.svg`;
const luxury = `${process.env.PUBLIC_URL}/assets/images/star.svg`;
const wifi = `${process.env.PUBLIC_URL}/assets/images/wi-fi.svg`;
const express = `${process.env.PUBLIC_URL}/assets/images/rocket.svg`;

type FilterKey =
  | 'have_first_class'
  | 'have_second_class'
  | 'have_third_class'
  | 'have_fourth_class'
  | 'have_wifi'
  | 'have_express';

interface FilterItem {
  key: FilterKey;
  label: string;
  icon: string;
}

export default function TicketsFilter(): React.ReactElement {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.routes);
  const location = useLocation();
  const page = location.pathname.split('/').filter(Boolean).pop();

  const isTicketsPage = page === 'tickets' || page === 'seats';

  const filterList: FilterItem[] = [
    { key: 'have_second_class', label: 'Купе', icon: compartment },
    { key: 'have_third_class', label: 'Плацкарт', icon: reserved },
    { key: 'have_fourth_class', label: 'Сидячий', icon: sitting },
    { key: 'have_first_class', label: 'Люкс', icon: luxury },
    { key: 'have_wifi', label: 'Wi-Fi', icon: wifi },
    { key: 'have_express', label: 'Экспресс', icon: express },
  ];

  const minPrice = 0;
  const maxPrice = 7000;

  const [localPriceRange, setLocalPriceRange] = useState([
    minPrice,
    maxPrice / 2,
  ]);

  const [isPlusFrom, setIsPlusFrom] = useState(true);
  const [isPlusBack, setIsPlusBack] = useState(true);
  const {
    fromId,
    toId,
    isSearched,
    dateStart,
    dateEnd,
    limit,
    offset,
    sortBy,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  } = formData;

  useEffect(() => {
    if (fromId && toId && isSearched && page === 'tickets') {
      dispatch(
        fetchRoutes({
          from_city_id: fromId,
          to_city_id: toId,
          date_start: dateStart,
          date_end: dateEnd,
          // limit: limit,
          // offset: offset,
          have_first_class,
          have_second_class,
          have_third_class,
          have_fourth_class,
          have_wifi,
          have_express,
          price_from,
          price_to,
          start_departure_hour_from,
          start_departure_hour_to,
          start_arrival_hour_from,
          start_arrival_hour_to,
          end_departure_hour_from,
          end_departure_hour_to,
          end_arrival_hour_from,
          end_arrival_hour_to,
        })
      );
    }
  }, [
    dispatch,
    page,
    fromId,
    toId,
    isSearched,
    dateStart,
    dateEnd,
    // limit,
    // offset,
    // sortBy,
    have_first_class,
    have_second_class,
    have_third_class,
    have_fourth_class,
    have_wifi,
    have_express,
    price_from,
    price_to,
    start_departure_hour_from,
    start_departure_hour_to,
    start_arrival_hour_from,
    start_arrival_hour_to,
    end_departure_hour_from,
    end_departure_hour_to,
    end_arrival_hour_from,
    end_arrival_hour_to,
  ]);


  const handleSliderPriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalPriceRange(value as [number, number]);
    }
  };

  const handleSliderPriceAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setPriceRange(value as [number, number]));
    }
  };

  const handleToggle = (key: FilterKey) => {
    dispatch(toggleFilter(key));
  };

  const handleDateChange = (
    name: 'dateStart' | 'dateEnd' | 'date_start_arrival' | 'date_end_arrival',
    date: Date | null
  ) => {
    const timestampStr = date ? String(Math.floor(date.getTime() / 1000)) : '';
    dispatch(updateField({ name, value: timestampStr }));
  };

  return (
    <>
      {isTicketsPage ? (
        <div className={styles['tickets__filter']}>
          <div className={styles['tickets__filter-dates']}>
            <TicketDates
              dateTo={formData.dateEnd || ''}
              dateFrom={formData.dateStart || ''}
              onChangeDateTo={(date) => handleDateChange('dateEnd', date)}
              onChangeDateFrom={(date) => handleDateChange('dateStart', date)}
              variant={'sidebar'}
            />
          </div>
          <div className={styles['tickets__filter_filters']}>
            <ul className={styles.filter__list}>
              {filterList.map((item) => {
                const isCurrentFilterActive = !!formData[item.key];

                return (
                  <li key={item.key} className={styles.filter__item}>
                    <div className={styles.filter__left_group}>
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={styles.filter__icon}
                      />
                      <span className={styles.filter__label}>{item.label}</span>
                    </div>

                    <div
                      className={`${styles.filter__switcher} ${isCurrentFilterActive ? styles.filter__switcher_active : ''}`}
                    >
                      <button
                        className={`${styles.filter__round} ${isCurrentFilterActive ? styles.filter__round_active : ''}`}
                        onClick={() => handleToggle(item.key)}
                      ></button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.tickets__filter_prices}>
            <h3 className={styles.prices__title}>Стоимость</h3>
            <div className={styles.prices__labels}>
              <span>от</span>
              <span>до</span>
            </div>
            <div className={styles.prices__slider_container}>
              <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={localPriceRange}
                onChange={handleSliderPriceChange}
                onChangeComplete={handleSliderPriceAfterChange}
                className={styles.custom_slider}
                allowCross={false}
              />
            </div>
            <div className={styles.prices__values}>
              <span className={styles.prices__value_min}>
                {localPriceRange[0]}
              </span>
              <span className={styles.prices__value_current}>
                {localPriceRange[1]}
              </span>
              <span className={styles.prices__value_max}>{maxPrice}</span>
            </div>
          </div>
          <div className={styles['tickets__filter_to']}>
            <div className={styles['filter__wrapper']}>
              <div className={styles['filter__to_container']}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/filter-to.png`}
                  alt="Back"
                />
                <span>Туда</span>
              </div>
              <div
                className={`${isPlusFrom ? styles.tickets__filter_plus : styles.tickets__filter_minus}`}
                onClick={() => setIsPlusFrom(!isPlusFrom)}
              ></div>
            </div>

            {!isPlusFrom && (
              <div className={styles['time__container']}>
                <TimeFilter
                  title={'Время отбытия'}
                  fieldName={'start_departure'}
                />
                <TimeFilter
                  title={'Время прибытия'}
                  fieldName={'start_arrival'}
                />
              </div>
            )}
          </div>
          <div className={styles['tickets__filter_back']}>
            <div className={styles['filter__wrapper']}>
              <div className={styles['filter__back_container']}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/filter-back.png`}
                  alt="To"
                />
                <span>Обратно</span>
              </div>
              <div
                className={`${isPlusBack ? styles.tickets__filter_plus : styles.tickets__filter_minus}`}
                onClick={() => setIsPlusBack(!isPlusBack)}
              ></div>
            </div>
            {!isPlusBack && (
              <div className={styles['time__container']}>
                <TimeFilter
                  title={'Время отбытия'}
                  fieldName={'end_departure'}
                />
                <TimeFilter
                  title={'Время прибытия'}
                  fieldName={'end_arrival'}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles['tickets__filter']}>
          <TripDetails />
        </div>
      )}
    </>
  );
}
