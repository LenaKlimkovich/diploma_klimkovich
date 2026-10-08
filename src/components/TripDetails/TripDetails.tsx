import { useState } from 'react';
import styles from './TripDetails.module.css';

export default function TripDetails() {
  const [isToOpen, setIsToOpen] = useState(true);
  const [isBackOpen, setIsBackOpen] = useState(true);
  const [isPassengersOpen, setIsPassengersOpen] = useState(true);

  return (
    <div className={styles['trip-details']}>
      <h3 className={styles['trip-details__title']}>ДЕТАЛИ ПОЕЗДКИ</h3>

      {/* --- СЕКЦИЯ ТУДА --- */}
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
              src="/assets/images/arrow-to-black.png"
              alt="Arrow"
            ></img>
            <h1 className={styles['trip-details__section-title']}>Туда</h1>
            <span className={styles['trip-details__section-date']}>
              30.08.2018
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
                116С
              </strong>
            </div>
            <div className={styles['trip-details__info-row']}>
              <span>Название</span>
              <span className={styles['trip-details__text-right']}>
                Адлер
                <br />
                Санкт-Петербург
              </span>
            </div>

            {/* Сетка маршрута */}
            <div className={styles['trip-details__route-grid']}>
              {/* ЛЕВАЯ КОЛОНКА: Отправление */}
              <div className={styles['trip-details__route-time-block']}>
                <div className={styles['trip-details__time']}>00:10</div>
                <div className={styles['trip-details__date']}>30.08.2018</div>
                <div className={styles['trip-details__city']}>Москва</div>
                <div className={styles['trip-details__station']}>
                  Курский вокзал
                </div>
              </div>

              {/* ЦЕНТРАЛЬНАЯ КОЛОНКА: Время в пути + Стрелочка */}
              <div className={styles['trip-details__center-column']}>
                <div className={styles['trip-details__duration']}>9:42</div>
                <img
                  className={styles['trip-details__arrow-line']}
                  src="/assets/images/arrow-to-brightorange.png"
                  alt="Arrow to"
                />
              </div>

              {/* ПРАВАЯ КОЛОНКА: Прибытие */}
              <div
                className={`${styles['trip-details__route-time-block']} ${styles['trip-details__text-right']}`}
              >
                <div className={styles['trip-details__time']}>09:52</div>
                <div className={styles['trip-details__date']}>31.08.2018</div>
                <div className={styles['trip-details__city']}>
                  Санкт-Петербург
                </div>
                <div className={styles['trip-details__station']}>
                  Ладожский вокзал
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* --- СЕКЦИЯ ОБРАТНО --- */}
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
              src="/assets/images/arrow-back-black.png"
              alt="Arrow back"
            ></img>
            <h1 className={styles['trip-details__section-title']}>Обратно</h1>
            <span className={styles['trip-details__section-date']}>
              09.09.2018
            </span>
          </div>
          <div
            className={
              isBackOpen
                ? styles['trip-details__btn-minus']
                : styles['trip-details__btn-plus']
            }
          ></div>
        </div>

        {isBackOpen && (
          <div className={styles['trip-details__section-content']}>
            <div className={styles['trip-details__info-row']}>
              <span>№ Поезда</span>
              <strong className={styles['trip-details__train-number']}>
                116С
              </strong>
            </div>
            <div className={styles['trip-details__info-row']}>
              <span>Название</span>
              <span className={styles['trip-details__text-right']}>
                Адлер
                <br />
                Санкт-Петербург
              </span>
            </div>
            <div className={styles['trip-details__route-grid']}>
              {/* ЛЕВАЯ КОЛОНКА: Отправление */}
              <div className={styles['trip-details__route-time-block']}>
                <div className={styles['trip-details__time']}>00:10</div>
                <div className={styles['trip-details__date']}>30.08.2018</div>
                <div className={styles['trip-details__city']}>Москва</div>
                <div className={styles['trip-details__station']}>
                  Курский вокзал
                </div>
              </div>

              {/* ЦЕНТРАЛЬНАЯ КОЛОНКА: Время в пути + Стрелочка */}
              <div className={styles['trip-details__center-column']}>
                <div className={styles['trip-details__duration']}>9:42</div>
                <img
                  className={styles['trip-details__arrow-line']}
                  src="/assets/images/arrow-back-brightorange.png"
                  alt="Arrow to"
                />
              </div>

              {/* ПРАВАЯ КОЛОНКА: Прибытие */}
              <div
                className={`${styles['trip-details__route-time-block']} ${styles['trip-details__text-right']}`}
              >
                <div className={styles['trip-details__time']}>09:52</div>
                <div className={styles['trip-details__date']}>31.08.2018</div>
                <div className={styles['trip-details__city']}>
                  Санкт-Петербург
                </div>
                <div className={styles['trip-details__station']}>
                  Ладожский вокзал
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- СЕКЦИЯ ПАССАЖИРЫ --- */}
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
              src="../assets/images/passenger.png"
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
            <div className={styles['trip-details__info-row']}>
              <span className={styles['trip-details__muted-text']}>
                2 Взрослых
              </span>
              <span className={styles['trip-details__price-row']}>
                5 840 <span className={styles['trip-details__ruble']}>₽</span>
              </span>
            </div>
            <div className={styles['trip-details__info-row']}>
              <span className={styles['trip-details__muted-text']}>
                1 Ребенок
              </span>
              <span className={styles['trip-details__price-row']}>
                1 920 <span className={styles['trip-details__ruble']}>₽</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- ИТОГ --- */}
      <div className={styles['trip-details__total-block']}>
        <h1 className={styles['trip-details__total-title']}>ИТОГ</h1>
        <span className={styles['trip-details__total-price']}>
          7 760 <span className={styles['trip-details__ruble--large']}>₽</span>
        </span>
      </div>
    </div>
  );
}
