import { ReactElement } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import styles from './TicketDates.module.css';
import { useMemo } from 'react';

import { ru } from 'date-fns/locale/ru';

registerLocale('ru', ru as any);

interface TicketDatesProps {
  dateTo: string;
  dateFrom: string;
  onChangeDateTo: (date: Date | null) => void;
  onChangeDateFrom: (date: Date | null) => void;
  variant: 'home' | 'tickets_page' | 'sidebar';
}

const parseTimestampToDate = (
  dateVal: string | null | undefined
): Date | null => {
  if (!dateVal || dateVal.trim() === '') return null;
  const timestamp = Number(dateVal);

  if (!isNaN(timestamp)) {
    const parsedDate = new Date(timestamp * 1000);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  return null;
};

export default function TicketDates({
  dateTo,
  dateFrom,
  onChangeDateTo,
  onChangeDateFrom,
  variant = 'home',
}: TicketDatesProps): ReactElement {
  const renderCustomHeader = ({
    monthDate,
    decreaseMonth,
    increaseMonth,
  }: any) => {
    const monthName = monthDate.toLocaleString('ru', { month: 'long' });
    const capitalizedMonth =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return (
      <div className={styles['ticket-form__custom-header-wrapper']}>
        <div className={styles['ticket-form__calendar-arrow']} />

        <div className={styles['ticket-form__custom-header']}>
          <button
            type="button"
            className={styles['ticket-form__nav-btn']}
            onClick={decreaseMonth}
          >
            ◄
          </button>
          <span className={styles['ticket-form__current-month-text']}>
            {capitalizedMonth}
          </span>
          <button
            type="button"
            className={styles['ticket-form__nav-btn']}
            onClick={increaseMonth}
          >
            ►
          </button>
        </div>
      </div>
    );
  };

  const resolvedInputClass = styles[variant];
  const computedInputClassName = `${resolvedInputClass} ${styles['ticket-form__input_type_date']}`;
  const containerClassName = styles[`ticket-form__dates_${variant}`];

  const validDateFrom = useMemo(
    () => parseTimestampToDate(dateFrom),
    [dateFrom]
  );
  const validDateTo = useMemo(() => parseTimestampToDate(dateTo), [dateTo]);

  const today = useMemo(() => new Date(), []);

  return (
    <div className={containerClassName}>
      {/* ПЕРВЫЙ ИНПУТ: Дата поездки (Туда) */}
      <div className={styles['ticket-form__field']}>
        <div className={styles['ticket-form__input-wrapper']}>
          {variant === 'sidebar' && (
            <h3 className={styles['ticket-form__date_title']}>Дата поездки</h3>
          )}
          <DatePicker
            locale="ru"
            selected={validDateFrom}
            onChange={(date: Date | null) => {
              if (date?.getTime() !== validDateFrom?.getTime()) {
                onChangeDateFrom(date);
              }
            }}
            placeholderText="ДД/ММ/ГГГГ"
            className={computedInputClassName}
            dateFormat="dd.MM.yyyy"
            minDate={today}
            popperPlacement="bottom"
            popperClassName={styles['ticket-form__calendar-popper']}
            openToDate={validDateFrom || today}
            renderCustomHeader={renderCustomHeader}
          />
          <img
            className={styles['ticket-form__icon-calendar']}
            src={`${process.env.PUBLIC_URL}/assets/images/calendar.png`}
            alt="Calendar"
          />
        </div>
      </div>

      {/* ВТОРОЙ ИНПУТ: Дата возвращения (Обратно) */}
      <div className={styles['ticket-form__field']}>
        <div className={styles['ticket-form__input-wrapper']}>
          {variant === 'sidebar' && (
            <h3 className={styles['ticket-form__date_title']}>
              Дата возвращения
            </h3>
          )}
          <DatePicker
            locale="ru"
            selected={validDateTo}
            onChange={(date: Date | null) => {
              if (date?.getTime() !== validDateTo?.getTime()) {
                onChangeDateTo(date);
              }
            }}
            placeholderText="ДД/ММ/ГГГГ"
            className={computedInputClassName}
            dateFormat="dd.MM.yyyy"
            minDate={validDateFrom || today}
            popperPlacement="bottom"
            popperClassName={styles['ticket-form__calendar-popper']}
            openToDate={validDateTo || today}
            renderCustomHeader={renderCustomHeader}
          />
          <img
            className={styles['ticket-form__icon-calendar']}
            src={`${process.env.PUBLIC_URL}/assets/images/calendar.png`}
            alt="Calendar"
          />
        </div>
      </div>
    </div>
  );
}
