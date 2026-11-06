import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateField,
  selectCity,
  setSearched,
  changeDirections,
  clearRoutes,
  fetchRoutes,
} from '../../store/slices/routesSlice';
import styles from './TicketForm.module.css';
import TicketDates from '../TicketDates/TicketDates';
import { BASEURL } from '../../store/store';

export interface TicketFormData {
  from: string;
  to: string;
  dateTo: string;
  dateFrom?: string;
}

export interface City {
  _id: string;
  name: string;
}

export default function TicketForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.routes);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTicketsPage = location.pathname === '/tickets';

  const TicketFormClass = isHomePage ? styles['home'] : styles['tickets_page'];

  const [isOpenFrom, setIsOpenFrom] = useState<boolean>(false);
  const [isOpenTo, setIsOpenTo] = useState<boolean>(false);
  const [citiesFrom, setCitiesFrom] = useState<City[]>([]);
  const [citiesTo, setCitiesTo] = useState<City[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (!formData.toName.trim()) {
      setCitiesTo([]);
      const fetchDefaultCities = async () => {
        try {
          const response = await fetch(`${BASEURL}/routes/cities?name=а`);
          const data = await response.json();
          setCitiesTo(data);
        } catch (error) {
          console.error('Ошибка при загрузке дефолтных городов:', error);
        }
      };

      fetchDefaultCities();
      return () => controller.abort();
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `${BASEURL}/routes/cities?name=${formData.toName}`
        );
        const data = await response.json();

        setCitiesTo(data);
      } catch (error) {
        console.error('Ошибка при загрузке городов:', error);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [formData.toName]);

  useEffect(() => {
    const controller = new AbortController();

    if (!formData.fromName.trim()) {
      setCitiesFrom([]);
      const fetchDefaultCities = async () => {
        try {
          const response = await fetch(`${BASEURL}/routes/cities?name=а`);
          const data = await response.json();
          setCitiesFrom(data);
        } catch (error) {
          console.error('Ошибка при загрузке дефолтных городов:', error);
        }
      };

      fetchDefaultCities();
      return () => controller.abort();
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `${BASEURL}/routes/cities?name=${formData.fromName}`
        );
        const data = await response.json();

        setCitiesFrom(data);
      } catch (error) {
        console.error('Ошибка при загрузке городов:', error);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
      controller.abort();
    };
  }, [formData.fromName]);

  const navigate = useNavigate();
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const handleChangeDirections = (): void => {
    dispatch(changeDirections());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const fieldName = name === 'from' ? 'fromName' : 'toName';
    const idField = name === 'from' ? 'fromId' : 'toId';

    dispatch(updateField({ name: fieldName, value: value }));

    if (value.trim() === '') {
      dispatch(updateField({ name: idField, value: '' }));
      dispatch(clearRoutes());
    }
  };

  const handleSelectCity = (
    name: 'fromName' | 'toName',
    city: string
  ): void => {
    dispatch(updateField({ name, value: city }));

    if (name === 'fromName') setIsOpenFrom(false);
    if (name === 'toName') setIsOpenTo(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const params: Record<string, string> = {
      from: formData.fromName,
      to: formData.toName,
      dateTo: formData.dateStart || '',
      dateFrom: formData.dateEnd || '',
      sortBy: formData.sortBy,
    };

    const searchParams = new URLSearchParams(params).toString();
    navigate(`/tickets?${searchParams}`);
    dispatch(
      fetchRoutes({
        from_city_id: formData.fromId,
        to_city_id: formData.toId,
        date_start: formData.dateStart,
        date_end: formData.dateEnd,
      })
    );
    dispatch(setSearched(true));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (fromRef.current && !fromRef.current.contains(target)) {
        setIsOpenFrom(false);
      }
      if (toRef.current && !toRef.current.contains(target)) {
        setIsOpenTo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form
      className={`${styles['ticket-form']} ${TicketFormClass}`}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={`${styles['ticket-form__row']} ${TicketFormClass}`}>
        <div className={`${styles['ticket-form__group']} ${TicketFormClass}`}>
          <h3 className={styles['ticket-form__title']}>Направление</h3>
          <div className={styles['ticket-form__directions']}>
            <div ref={fromRef} className={styles['ticket-form__field']}>
              <input
                className={styles['ticket-form__input']}
                type="text"
                id="from"
                onFocus={() => setIsOpenFrom(true)}
                name="from"
                aria-label="Город отправления"
                placeholder="Откуда"
                value={formData.fromName}
                onChange={(e) => handleChange(e)}
                required
              />

              {isOpenFrom && citiesFrom.length > 0 && (
                <ul className={styles['ticket-form__list']}>
                  {citiesFrom.map((city) => (
                    <li
                      key={city._id}
                      className={styles['ticket-form__list-item']}
                      onMouseDown={() => {
                        handleSelectCity('fromName', `${city.name}`);
                        dispatch(
                          selectCity({
                            type: 'from',
                            name: city.name,
                            id: city._id,
                          })
                        );
                      }}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
              <img
                className={styles['ticket-form__icon-location']}
                src={`${process.env.PUBLIC_URL}/assets/images/location.png`}
                alt="Location"
              />
            </div>

            <button
              type="button"
              className={styles['ticket-form__swap-btn']}
              onClick={handleChangeDirections}
              aria-label="Поменять местами"
            >
              <img
                className={styles['ticket-form__icon-swap']}
                src={`${process.env.PUBLIC_URL}/assets/images/swap-location.png`}
                alt="swap location"
              />
            </button>

            <div ref={toRef} className={styles['ticket-form__field']}>
              <input
                className={styles['ticket-form__input']}
                type="text"
                id="to"
                name="to"
                onFocus={() => setIsOpenTo(true)}
                aria-label="Город назначения"
                placeholder="Куда"
                value={formData.toName}
                onChange={handleChange}
                required
              />
              {isOpenTo && citiesTo.length > 0 && (
                <ul className={styles['ticket-form__list']}>
                  {citiesTo.map((city) => (
                    <li
                      key={city._id}
                      className={styles['ticket-form__list-item']}
                      onMouseDown={() => {
                        handleSelectCity('toName', `${city.name}`);
                        dispatch(
                          selectCity({
                            type: 'to',
                            name: city.name,
                            id: city._id,
                          })
                        );
                      }}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
              <img
                className={styles['ticket-form__icon-location']}
                src={`${process.env.PUBLIC_URL}/assets/images/location.png`}
                alt="Location"
              />
            </div>
          </div>
        </div>
        <div className={`${styles['ticket-form__group']} ${TicketFormClass}`}>
          {(isHomePage || isTicketsPage) && (
            <h3 className={styles['ticket-form__title']}>Дата</h3>
          )}

          <TicketDates
            dateTo={formData.dateEnd ?? ''}
            dateFrom={formData.dateStart ?? ''}
            onChangeDateTo={(date: Date | null) => {
              const timestampStr = date
                ? Math.floor(date.getTime() / 1000).toString()
                : '';
              dispatch(updateField({ name: 'dateEnd', value: timestampStr }));
              if (date === null) {
                dispatch(updateField({ name: 'dateEnd', value: '' }));
                dispatch(clearRoutes());
              }
            }}

            onChangeDateFrom={(date: Date | null) => {
              const timestampStr = date
                ? Math.floor(date.getTime() / 1000).toString()
                : '';
              dispatch(updateField({ name: 'dateStart', value: timestampStr }));
              if (date === null) {
                dispatch(updateField({ name: 'dateStart', value: '' }));
                dispatch(clearRoutes());
              }
            }}
            variant={isHomePage ? 'home' : 'tickets_page'}
          />
        </div>
      </div>
      {formData.loading ? (
        <button
          className={`${styles['ticket-form__submit']} ${styles['loading']} ${TicketFormClass}`}
          type="submit"
          disabled
        >
          НАЙТИ БИЛЕТЫ
        </button>
      ) : (
        <button
          className={`${styles['ticket-form__submit']} ${TicketFormClass}`}
          type="submit"
        >
          НАЙТИ БИЛЕТЫ
        </button>
      )}
    </form>
  );
}
