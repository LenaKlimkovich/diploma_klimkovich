import styles from './Selection.module.css';
import { useState } from 'react';

interface SelectionProps {
  isReturn?: boolean;
}

type AmenityType = 'none' | 'air-conditioning' | 'wifi' | 'bedding' | 'drinks';

export default function Selection({
  isReturn = false,
}: SelectionProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<
    'none' | 'coupe' | 'sitting' | 'reserved-seat' | 'luxury'
  >('none');

  const [activeAmenity, setActiveAmenity] = useState<
    ('none' | 'air-conditioning' | 'wifi' | 'bedding' | 'drinks')[]
  >(['none']);

  const [activeWagon, setActiveWagon] = useState<string>('07');

  const handlerAddAmenity = (amenity: Exclude<AmenityType, 'none'>) => {
    setActiveAmenity((prev) =>
      activeAmenity.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <section className={styles['seats-selection']}>
      <div
        className={`${styles['seats-selection__back']} ${isReturn ? styles['seats-selection__back_return'] : ''}`}
      >
        <img
          className={`${styles['seats-selection__back-arrow']} ${isReturn ? styles['seats-selection__back-arrow_return'] : ''}`}
          src="/assets/images/arrow-to-black.png"
          alt="Arrow to"
        />
        <button type="button" className={styles['seats-selection__back-btn']}>
          Выбрать другой поезд
        </button>
      </div>

      {/* Компактная плашка текущего поезда */}
      <div className={styles['seats-selection__train-info']}>
        <div className={styles['train-info__number-block']}>
          <div className={styles['train-info__icon']}></div>
          <div>
            <div className={styles['train-info__number']}>116С</div>
            <div className={styles['train-info__route']}>
              <span>Адлер →</span>
              <span>Москва →</span>
              <span>Санкт-Петербург</span>
            </div>
          </div>
        </div>
        <div className={styles['train-info__time-block']}>
          <div className={styles['train-info__time']}>00:10</div>
          <div className={styles['train-info__station']}>
            <span>Москва </span>
            <span>Курский вокзал</span>
          </div>
        </div>
        <img
          className={styles['train-info__arrow-to']}
          src="/assets/images/arrow-to.png"
          alt="Arrow to"
        ></img>
        <div className={styles['train-info__time-block']}>
          <div className={styles['train-info__time']}>09:52</div>
          <div className={styles['train-info__station']}>
            <span>Санкт-Петербург</span>
            <span>Ладожский вокзал</span>
          </div>
        </div>
        <div className={styles['train-info__duration']}>
          <img
            className={styles['train-info__clock']}
            src="/assets/images/clock.png"
            alt="Clock"
          ></img>

          <div className={styles['train-info__hours-minutes']}>
            <span>9 часов</span>
            <span>42 минуты</span>
          </div>
        </div>
      </div>

      {/* Блок: Количество билетов */}
      <section className={styles['seats-selection__tickets-number']}>
        <h1 className={styles['seats-selection__title-number']}>
          Количество билетов
        </h1>
        <div className={styles['seats-selection__tickets-grid']}>
          <div className={styles['ticket-counter']}>
            <div className={styles['ticket-counter__row']}>
              <span className={styles['ticket-counter__label']}>
                Взрослых - 2
              </span>
            </div>
            <p className={styles['ticket-counter__hint-adults']}>
              Можно добавить еще 3 пассажиров
            </p>
          </div>

          <div className={styles['ticket-counter']}>
            <div className={styles['ticket-counter__row']}>
              <span className={styles['ticket-counter__label']}>
                Детских - 1
              </span>
            </div>
            <p className={styles['ticket-counter__hint-children']}>
              Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у
              взрослых, но дешевле в среднем на 50-65%
            </p>
          </div>

          <div
            className={`${styles['ticket-counter']} $styles['ticket-counter__children_noseat']`}
          >
            <div className={styles['ticket-counter__row']}>
              <span className={styles['ticket-counter__label']}>
                Детских «без места» - 0
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Блок: Тип вагона */}
      <section className={styles['seats-selection__car-type']}>
        <h1 className={styles['seats-selection__title']}>Тип вагона</h1>
        <div className={styles['seats-selection__tabs']}>
          <button
            className={`${styles['tab-btn']} ${activeTab === 'sitting' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('sitting')}
          >
            <img
              className={styles['tab-btn__icon']}
              src="/assets/images/sitting-passenger.svg"
              alt="Sitting passsenger"
            ></img>{' '}
            Сидячий
          </button>
          <button
            className={`${styles['tab-btn']} ${activeTab === 'reserved-seat' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('reserved-seat')}
          >
            <img
              className={styles['tab-btn__icon']}
              src="/assets/images/reserved-seat.svg"
              alt="Reserved seat"
            ></img>{' '}
            Плацкарт
          </button>
          <button
            className={`${styles['tab-btn']} ${activeTab === 'coupe' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('coupe')}
          >
            <img
              className={styles['tab-btn__icon']}
              src="/assets/images/compartment.svg"
              alt="Compartment"
            ></img>{' '}
            Купе
          </button>
          <button
            className={`${styles['tab-btn']} ${activeTab === 'luxury' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('luxury')}
          >
            <img
              className={styles['tab-btn__icon']}
              src="/assets/images/star.svg"
              alt="Luxury"
            ></img>
            Люкс
          </button>
        </div>
      </section>

      {activeTab !== 'none' && (
        <div className={styles['seats-selection__wagon-selector']}>
          <div className={styles['wagon-selector__header']}>
            <div className={styles['wagon-selector__list']}>
              Вагоны
              <button
                className={`${styles['wagon-btn']} ${activeWagon === '07' ? styles['wagon-btn_active'] : ''}`}
                onClick={() => setActiveWagon('07')}
              >
                07
              </button>
              <button
                className={`${styles['wagon-btn']} ${activeWagon === '09' ? styles['wagon-btn_active'] : ''}`}
                onClick={() => setActiveWagon('09')}
              >
                09
              </button>
            </div>
            <span className={styles['wagon-selector__direction']}>
              Нумерация вагонов начинается с головы поезда
            </span>
          </div>

          {/* Детализация вагона */}
          <div className={styles['wagon-detail']}>
            <div className={styles['wagon-detail__number-block']}>
              <div className={styles['wagon-detail__huge-number']}>07</div>
              <div className={styles['wagon-detail__label']}>вагон</div>
            </div>

            <div className={styles['wagon-detail__info-grid']}>
              <div className={styles['wagon-detail__seats-info']}>
                <div className={styles['wagon-detail__info-column']}>
                  <span className={styles['wagon-detail__seats-number']}>
                    Места <span>11</span>
                  </span>
                  <span className={styles['wagon-detail__seats']}>
                    Верхние <strong>3</strong>
                  </span>
                  <span className={styles['wagon-detail__seats']}>
                    Нижние <strong>8</strong>
                  </span>
                </div>
                <div className={styles['wagon-detail__info-column']}>
                  <span className={styles['wagon-detail__price']}>
                    Стоимость
                  </span>
                  <span className={styles['wagon-detail__sum']}>
                    <strong>2 920</strong> ₽
                  </span>
                  <span className={styles['wagon-detail__sum']}>
                    <strong>3 530</strong> ₽
                  </span>
                </div>
              </div>

              <div className={styles['wagon-detail__amenities']}>
                <div className={styles['amenities-title']}>
                  <span className={styles['amenities-services']}>
                    Обслуживание
                  </span>
                  <span className={styles['amenities-fpk']}>ФПК</span>
                </div>
                <div className={styles['amenities']}>
                  <div
                    className={`
  ${styles['amenity']} 
  ${styles['air-conditioning']} 
  ${activeAmenity.includes('air-conditioning') ? styles['amenity_active'] : ''}
`}
                    onClick={() => handlerAddAmenity('air-conditioning')}
                    data-title="Кондиционер"
                  ></div>
                  <div
                    className={`${styles['amenity']} ${styles['wifi']} ${activeAmenity.includes('wifi') ? styles['amenity_active'] : ''}`}
                    onClick={() => handlerAddAmenity('wifi')}
                    data-title="Wi-fi"
                  ></div>
                  <div
                    className={`${styles['amenity']} ${styles['bedding']} ${activeAmenity.includes('bedding') ? styles['amenity_active'] : ''}`}
                    onClick={() => handlerAddAmenity('bedding')}
                    data-title="Постельное белье"
                  ></div>
                  <div
                    className={`${styles['amenity']} ${styles['drinks']} ${activeAmenity.includes('drinks') ? styles['amenity_active'] : ''}`}
                    onClick={() => handlerAddAmenity('drinks')}
                    data-title="Напитки"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <span className={styles['wagon-add-info']}>
            13 человек выбирают
            <br /> места в этом поезде
          </span>
          <div className={styles['wagon-map']}>
            {activeTab === 'coupe' && (
              <img
                src="/assets/images/compartment-plan.svg"
                alt="Compartment"
              />
            )}
            {activeTab === 'sitting' && (
              <img src="/assets/images/sitting-plan.png" alt="Sitting" />
            )}
            {activeTab === 'reserved-seat' && (
              <img src="/assets/images/reserved-plan.svg" alt="Reserved" />
            )}
            {activeTab === 'luxury' && (
              <img src="/assets/images/luxury-plan.png" alt="Luxury" />
            )}
          </div>
          <div className={styles['ticket-price']}>
            8 080<span>₽</span>
          </div>
        </div>
      )}
    </section>
  );
}
