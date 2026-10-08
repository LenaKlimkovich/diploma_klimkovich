import { useLocation, useNavigate } from 'react-router-dom';
import styles from './TrainTicket.module.css';

export default function TrainTicket(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.split('/').filter(Boolean).pop();

  const isTicketsPage = page === 'tickets' || page === 'seats';

  return (
    <div
      className={`${styles.ticket} ${!isTicketsPage ? styles.ticket_check : ''}`}
    >
      <div className={styles.ticket__left}>
        <div className={styles.ticket__icon}></div>
        <div className={styles.ticket__train_number}>116С</div>
        <div className={styles.ticket__route_cities}>
          Адлер → <br />
          Москва → <br />
          Санкт-Петербург
        </div>
      </div>

      {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: Маршруты туда и обратно */}
      <div className={styles.ticket__center}>
        {/* Рейс ТУДА */}
        <div className={styles.ticket__route_row}>
          <div className={styles.ticket__time_block}>
            <div className={styles.ticket__time}>00:10</div>
            <div className={styles.ticket__city}>Москва</div>
            <div className={styles.ticket__station}>Курский вокзал</div>
          </div>

          <div className={styles.ticket__duration_block}>
            <span className={styles.ticket__duration_text}>9:42</span>
            <img
              className={styles.ticket__arrow}
              src="/assets/images/arrow-to.png"
              alt="Arrow"
            ></img>
          </div>

          <div className={styles.ticket__time_block}>
            <div className={styles.ticket__time}>09:52</div>
            <div className={styles.ticket__city}>Санкт-Петербург</div>
            <div className={styles.ticket__station}>Ладожский вокзал</div>
          </div>
        </div>

        {/* Рейс ОБРАТНО */}
        <div className={styles.ticket__route_row}>
          <div className={styles.ticket__time_block}>
            <div className={styles.ticket__time}>00:10</div>
            <div className={styles.ticket__city}>Москва</div>
            <div className={styles.ticket__station}>Курский вокзал</div>
          </div>

          <div className={styles.ticket__duration_block}>
            <span className={styles.ticket__duration_text}>9:42</span>
            <img
              className={styles.ticket__arrow_back}
              src="/assets/images/arrow-back.png"
              alt="Arrow"
            ></img>
          </div>

          <div className={styles.ticket__time_block}>
            <div className={styles.ticket__time}>09:52</div>
            <div className={styles.ticket__city}>Санкт-Петербург</div>
            <div className={styles.ticket__station}>Ладожский вокзал</div>
          </div>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Выбор мест и ценники */}
      <div className={styles.ticket__right}>
        <div className={styles.ticket__prices_list}>
          {/* Обычные типы мест */}
          <div className={styles.ticket__price_row}>
            <span className={styles.ticket__seat_type}>Сидячий</span>
            <span className={styles.ticket__seat_count}>88</span>
            <span className={styles.ticket__seat_price}>
              от <strong>1 920</strong>
              <img
                className={styles.ticket__seat_rubble}
                src="/assets/images/ruble.png"
                alt="rubble"
              />
            </span>
          </div>
          <div className={styles.ticket__price_row}>
            <span className={styles.ticket__seat_type}>Плацкарт</span>
            <span className={styles.ticket__seat_count}>52</span>
            <span className={styles.ticket__seat_price}>
              от <strong>2 530</strong>{' '}
              <img
                className={styles.ticket__seat_rubble}
                src="/assets/images/ruble.png"
                alt="rubble"
              />
            </span>
          </div>

          {/* Секция Купе с подкатегориями */}
          <div className={styles.ticket__price_row}>
            <span className={styles.ticket__seat_type}>Купе</span>
            <span className={styles.ticket__seat_count}>24</span>
            <span className={styles.ticket__seat_price}>
              от <strong>3 820</strong>{' '}
              <img
                className={styles.ticket__seat_rubble}
                src="/assets/images/ruble.png"
                alt="rubble"
              />
            </span>
          </div>
          <div className={styles.ticket__price_row}>
            <span className={styles.ticket__seat_type}>Люкс</span>
            <span className={styles.ticket__seat_count}>15</span>
            <span className={styles.ticket__seat_price}>
              от <strong>4 950</strong>{' '}
              <img
                className={styles.ticket__seat_rubble}
                src="/assets/images/ruble.png"
                alt="rubble"
              />
            </span>
          </div>

          {/* Вложенная плашка (верхние/нижние места в купе) */}
          {/* <div className={styles.ticket__sub_prices}>
            <div className={styles.ticket__price_row_sub}>
              <span className={styles.ticket__seat_type_sub}>верхние</span>
              <span className={styles.ticket__seat_count_sub}>19</span>
              <span className={styles.ticket__seat_price}><strong>2 920</strong></span>
            </div>
            <div className={styles.ticket__price_row_sub}>
              <span className={styles.ticket__seat_type_sub}>нижние</span>
              <span className={styles.ticket__seat_count_sub}>5</span>
              <span className={styles.ticket__seat_price}><strong>3 530 ₽</strong></span>
            </div>
          </div> */}
        </div>
        <img
          className={styles.ticket__amenities}
          src="/assets/images/amenities.png"
          alt="Train amenities"
        ></img>
        {isTicketsPage ? (
          <button
            type="button"
            className={styles.ticket__btn}
            onClick={() => {
              navigate('/tickets/seats');
            }}
          >
            Выбрать места
          </button>
        ) : (
          <button
            type="button"
            className={styles.ticket__btn_change}
            onClick={() => {
              navigate('/tickets');
            }}
          >
            Изменить
          </button>
        )}
      </div>
    </div>
  );
}
