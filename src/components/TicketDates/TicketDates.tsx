import { ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import styles from './TicketDates.module.css';

interface TicketDatesProps {
  dateTo: Date | null;
  dateFrom: Date | null;
  onChangeDateTo: (date: Date | null) => void;
  onChangeDateFrom: (date: Date | null) => void;
  variant: 'home' | 'tickets_page' | 'sidebar';
}

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
            selected={
              dateFrom
            } /* ИСПРАВЛЕНО: Для даты "Туда" используем dateFrom */
            onChange={onChangeDateFrom}
            placeholderText="ДД/ММ/ГГГГ"
            className={computedInputClassName}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()} /* Минимальная дата — сегодня */
            maxDate={
              dateTo || undefined
            } /* ИСПРАВЛЕНО: Нельзя выбрать дату "Туда" позже, чем "Обратно" */
            popperPlacement="bottom"
            /* ДОБАВЛЕНО: Передаем класс из стилей для кастомной стрелочки */
            popperClassName={styles['ticket-form__calendar-popper']}
            openToDate={dateFrom || new Date()}
            required
            renderCustomHeader={renderCustomHeader}
          />
          <img
            className={styles['ticket-form__icon-calendar']}
            src="/assets/images/calendar.png"
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
            selected={dateTo}
            onChange={onChangeDateTo}
            placeholderText="ДД/ММ/ГГГГ"
            className={computedInputClassName}
            dateFormat="dd.MM.yyyy"
            minDate={dateFrom || new Date()}
            popperPlacement="bottom"
            popperClassName={styles['ticket-form__calendar-popper']}
            openToDate={dateTo || dateFrom || new Date()}
            required
            renderCustomHeader={renderCustomHeader}
          />
          <img
            className={styles['ticket-form__icon-calendar']}
            src="/assets/images/calendar.png"
            alt="Calendar"
          />
        </div>
      </div>
    </div>
  );
}
