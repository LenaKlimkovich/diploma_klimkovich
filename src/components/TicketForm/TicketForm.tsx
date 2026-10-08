import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useRef, useEffect } from 'react';
import styles from './TicketForm.module.css';
import TicketDates from '../TicketDates/TicketDates';

export interface TicketFormData {
  from: string;
  to: string;
  dateTo: Date | null;
  dateFrom: Date | null;
}

export default function TicketForm(): React.ReactElement {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isTicketsPage = location.pathname === '/tickets';

  const TicketFormClass = isHomePage ? styles['home'] : styles['tickets_page'];

  const [formData, setFormData] = useState<TicketFormData>({
    from: '',
    to: '',
    dateTo: null,
    dateFrom: null,
  });

  const [isOpenFrom, setIsOpenFrom] = useState<boolean>(false);
  const [isOpenTo, setIsOpenTo] = useState<boolean>(false);

  const navigate = useNavigate();
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const handleSwapDirections = (): void => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const params: Record<string, string> = {
      from: formData.from,
      to: formData.to,
      dateTo: formData.dateTo
        ? formData.dateTo.toISOString().split('T')[0]
        : '',
    };

    if (formData.dateFrom) {
      params.dateFrom = formData.dateFrom.toISOString().split('T')[0];
    }

    const searchParams = new URLSearchParams(params).toString();
    navigate(`/tickets?${searchParams}`);
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
                value={formData.from}
                onChange={handleChange}
                required
              />
              {isOpenFrom && (
                <ul className={styles['ticket-form__list']}>
                  <li className={styles['ticket-form__list-item']}>Москва</li>
                  <li className={styles['ticket-form__list-item']}>
                    Санкт-петербург
                  </li>
                </ul>
              )}
              <img
                className={styles['ticket-form__icon-location']}
                src="/assets/images/location.png"
                alt="Location"
              />
            </div>

            <button
              type="button"
              className={styles['ticket-form__swap-btn']}
              onClick={handleSwapDirections}
              aria-label="Поменять местами"
            >
              <img
                className={styles['ticket-form__icon-swap']}
                src="/assets/images/swap-location.png"
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
                value={formData.to}
                onChange={handleChange}
                required
              />
              {isOpenTo && (
                <ul className={styles['ticket-form__list']}>
                  <li className={styles['ticket-form__list-item']}>Москва</li>
                  <li className={styles['ticket-form__list-item']}>
                    Санкт-петербург
                  </li>
                </ul>
              )}
              <img
                className={styles['ticket-form__icon-location']}
                src="/assets/images/location.png"
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
            dateTo={formData.dateTo}
            dateFrom={formData.dateFrom}
            onChangeDateTo={(date) =>
              setFormData((prev) => ({ ...prev, dateTo: date }))
            }
            onChangeDateFrom={(date) =>
              setFormData((prev) => ({ ...prev, dateFrom: date }))
            }
            variant={isHomePage ? 'home' : 'tickets_page'}
          />
        </div>
      </div>

      <button
        className={`${styles['ticket-form__submit']} ${TicketFormClass}`}
        type="submit"
      >
        НАЙТИ БИЛЕТЫ
      </button>
    </form>
  );
}
