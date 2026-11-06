import styles from './CheckPage.module.css';
import { useNavigate } from 'react-router-dom';
import TrainTicket from '../../components/TrainTicket/TrainTicket';
import { useAppSelector } from '../../store/hooks';

export default function CheckPage(): React.ReactElement {
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const passengers = useAppSelector((state) => state.order.departure.seats);
  const order = useAppSelector((state) => state.order);
  const navigate = useNavigate();

  return (
    <div className={styles.check__container}>
      <section className={styles.check__train}>
        <h3 className={styles.check__heading}>Поезд</h3>
        <TrainTicket route={selectedRoute} />
      </section>
      <section className={styles.check__passengers}>
        <h3 className={styles.check__heading}>Пассажиры</h3>
        <div className={styles['check__passengers-container']}>
          <div className={styles['check__passengers-list']}>
            {passengers.map((passenger, index) => {
              return (
                <div key={index} className={styles.passenger__card}>
                  <div className={styles['passenger__card-pic']}>
                    <img
                     src={`${process.env.PUBLIC_URL}/assets/images/passenger-pic.png`}
                      alt="Passenger"
                    />
                    <p>
                      {passenger.person_info.is_adult ? 'Взрослый' : 'Десткий'}
                    </p>
                  </div>
                  <div className={styles['passenger__details']}>
                    <p>
                      <span className={styles['passenger__full-name']}>
                        {passenger.person_info.last_name}{' '}
                        {passenger.person_info.first_name}{' '}
                        {passenger.person_info.patronymic}
                      </span>
                    </p>
                    <p>
                      Пол {passenger.person_info.gender ? 'мужской' : 'женский'}
                    </p>
                    <p>Дата рождения {passenger.person_info.birthday}</p>
                    <p>
                      {passenger.person_info.is_adult
                        ? `Паспорт РФ ${passenger.person_info.document_data}`
                        : `Свидетельство о рождении ${passenger.person_info.document_data}`}
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
                <span>
                  {order.prices.reduce((sum, item) => sum + item.price, 0)}{' '}
                </span>
                <span className={styles['check__rubles']}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
                    alt="Rouble"
                  />
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
            <p>
              {order.user.payment_method === 'cash' ? 'наличными' : 'онлайн'}
            </p>
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
