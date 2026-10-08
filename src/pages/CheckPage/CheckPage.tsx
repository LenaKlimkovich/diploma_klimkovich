import styles from './CheckPage.module.css';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainTicket from '../../components/TrainTicket/TrainTicket';
import { Passenger } from '../../components/PassengerForm/PassengerForm';

const passengers: Passenger[] = [
  {
    id: 1,
    type: 'adult',
    lastName: 'Мартынюк',
    firstName: 'Ирина',
    middleName: 'Эдуардовна',
    gender: 'F',
    birthDate: '17.02.1985',
    isLimitedMobility: false,
    documentType: 'Паспорт РФ',
    docSeries: '4204',
    docNumber: '380694',
    docError: '',
  },
  {
    id: 2,
    type: 'child',
    lastName: 'Мартынюк',
    firstName: 'Кирилл',
    middleName: 'Сергеевич',
    gender: 'M',
    birthDate: '17.02.1985',
    isLimitedMobility: false,
    documentType: 'Свидетельство о рождении',
    docSeries: '',
    docNumber: 'VIII УН 256319',
    docError: '',
  },
  {
    id: 2,
    type: 'child',
    lastName: 'Мартынюк',
    firstName: 'Кирилл',
    middleName: 'Сергеевич',
    gender: 'M',
    birthDate: '17.02.1985',
    isLimitedMobility: false,
    documentType: 'Свидетельство о рождении',
    docSeries: '',
    docNumber: 'VIII УН 256319',
    docError: '',
  },
];

export default function CheckPage(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className={styles.check__container}>
      <section className={styles.check__train}>
        <h3 className={styles.check__heading}>Поезд</h3>
        <TrainTicket />
      </section>
      <section className={styles.check__passengers}>
        <h3 className={styles.check__heading}>Пассажиры</h3>
        <div className={styles['check__passengers-container']}>
          <div className={styles['check__passengers-list']}>
            {passengers.map((passenger, index) => {
              return (
                <div key={passenger.id} className={styles.passenger__card}>
                  <div className={styles['passenger__card-pic']}>
                    <img
                      src="/assets/images/passenger-pic.png"
                      alt="Passenger"
                    />
                    <p>{passenger.type === 'adult' ? 'Взрослый' : 'Десткий'}</p>
                  </div>
                  <div className={styles['passenger__details']}>
                    <p>
                      <span className={styles['passenger__full-name']}>
                        {passenger.lastName} {passenger.firstName}{' '}
                        {passenger.middleName}
                      </span>
                    </p>
                    <p>
                      Пол {passenger.gender === 'M' ? 'мужской' : 'женский'}
                    </p>
                    <p>Дата рождения {passenger.birthDate}</p>
                    <p>
                      {passenger.documentType}{' '}
                      {passenger.type === 'adult'
                        ? `${passenger.docSeries} ${passenger.docNumber}`
                        : passenger.docNumber}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles['check__total-container']}>
            <div className={styles['check__total-price']}>
              <h3>Всего</h3>
              <p className={styles['check__total-rubles']}>
                7 760{' '}
                <span>
                  <img src="/assets/images/ruble.png" />
                </span>
              </p>
            </div>
            <button
              type="button"
              className={styles.passenger__btn_change}
              onClick={() => {
                navigate('/tickets/passengers');
              }}
            >
              Изменить
            </button>
          </div>
        </div>
      </section>
      <section className={styles.check__payment}>
        <h3 className={styles.check__heading}>Оплата</h3>
        <div className={styles['check__payment-container']}>
          <div className={styles['check__payment-method']}>
            <p>Наличными</p>
          </div>
          <div className={styles['check__payment-change']}>
            <button
              type="button"
              className={styles.passenger__btn_change}
              onClick={() => {
                navigate('/tickets/payment');
              }}
            >
              Изменить
            </button>
          </div>
        </div>
      </section>
      <button
        className={styles['order__confirm']}
        onClick={() => {
          navigate('/confirm');
        }}
      >
        Подтвердить
      </button>
    </div>
  );
}
