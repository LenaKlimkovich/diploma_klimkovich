import styles from './TicketsFilter.module.css';
import TicketDates from '../TicketDates/TicketDates';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import { TicketFormData } from '../TicketForm/TicketForm';
import TimeFilter from '../TimeFilter/TimeFilter';
import { useLocation } from 'react-router-dom';
import TripDetails from '../TripDetails/TripDetails';
const compartment = '/assets/images/compartment.svg';
const reserved = '/assets/images/reserved-seat.svg';
const sitting = '/assets/images/sitting-passenger.svg';
const luxury = '/assets/images/star.svg';
const wifi = '/assets/images/wi-fi.svg';
const express = '/assets/images/rocket.svg';

interface FilterOptions {
  compartment: boolean;
  reserved: boolean;
  sitting: boolean;
  luxury: boolean;
  wifi: boolean;
  express: boolean;
}

interface FilterItem {
  key: keyof FilterOptions;
  label: string;
  icon: string;
}

export default function TicketsFilter(): React.ReactElement {
  const [formData, setFormData] = useState<TicketFormData>({
    from: '',
    to: '',
    dateTo: null,
    dateFrom: null,
  });

  const location = useLocation();
  const page = location.pathname.split('/').filter(Boolean).pop();

  const isTicketsPage = page === 'tickets' || page === 'seats';

  const filterList: FilterItem[] = [
    { key: 'compartment', label: 'Купе', icon: compartment },
    { key: 'reserved', label: 'Плацкарт', icon: reserved },
    { key: 'sitting', label: 'Сидячий', icon: sitting },
    { key: 'luxury', label: 'Люкс', icon: luxury },
    { key: 'wifi', label: 'Wi-Fi', icon: wifi },
    { key: 'express', label: 'Экспресс', icon: express },
  ];

  const [filters, setFilters] = useState<FilterOptions>({
    compartment: false,
    reserved: false,
    sitting: false,
    luxury: false,
    wifi: false,
    express: false,
  });

  const minPrice = 1920;
  const maxPrice = 7000;

  const [priceRange, setPriceRange] = useState<[number, number]>([1920, 4500]);
  const [isPlusTo, setIsPlusTo] = useState(true);
  const [isPlusBack, setIsPlusBack] = useState(true);

  const handleSliderPriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value as [number, number]);
    }
  };

  const handleToggle = (key: keyof FilterOptions) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {isTicketsPage ? (
        <div className={styles['tickets__filter']}>
          <div className={styles['tickets__filter-dates']}>
            <TicketDates
              dateTo={formData.dateTo}
              dateFrom={formData.dateFrom}
              onChangeDateTo={(date) =>
                setFormData((prev) => ({ ...prev, dateTo: date }))
              }
              onChangeDateFrom={(date) =>
                setFormData((prev) => ({ ...prev, dateFrom: date }))
              }
              variant={'sidebar'}
            />
          </div>
          <div className={styles['tickets__filter_filters']}>
            <ul className={styles.filter__list}>
              {filterList.map((item) => {
                const isCurrentFilterActive = filters[item.key];

                return (
                  <li key={item.key} className={styles.filter__item}>
                    {/* Левая часть: Иконка и Название */}
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
                value={priceRange}
                onChange={handleSliderPriceChange}
                className={styles.custom_slider}
              />
            </div>
            <div className={styles.prices__values}>
              <span className={styles.prices__value_min}>{minPrice}</span>
              <span className={styles.prices__value_current}>
                {priceRange[1]}
              </span>
              <span className={styles.prices__value_max}>{maxPrice}</span>
            </div>
          </div>
          <div className={styles['tickets__filter_to']}>
            <div className={styles['filter__wrapper']}>
              <div className={styles['filter__to_container']}>
                <img src="/assets/images/filter-to.png" alt="Back" />
                <span>Туда</span>
              </div>
              <div
                className={`${isPlusTo ? styles.tickets__filter_plus : styles.tickets__filter_minus}`}
                onClick={() => setIsPlusTo(!isPlusTo)}
              ></div>
            </div>

            {!isPlusTo && (
              <div className={styles['time__container']}>
                <TimeFilter title={'Время отбытия'} />
                <TimeFilter title={'Время прибытия'} />
              </div>
            )}
          </div>
          <div className={styles['tickets__filter_back']}>
            <div className={styles['filter__wrapper']}>
              <div className={styles['filter__back_container']}>
                <img src="/assets/images/filter-back.png" alt="To" />
                <span>Обратно</span>
              </div>
              <div
                className={`${isPlusBack ? styles.tickets__filter_plus : styles.tickets__filter_minus}`}
                onClick={() => setIsPlusBack(!isPlusBack)}
              ></div>
            </div>
            {!isPlusBack && (
              <div className={styles['time__container']}>
                <TimeFilter title={'Время отбытия'} />
                <TimeFilter title={'Время прибытия'} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles['tickets__filter']}>
          {' '}
          <TripDetails />
        </div>
      )}
    </>
  );
}
