import styles from './PaymentPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className={styles.payment__container}>
      <section className={styles.payment__details}>
        <div className={styles['personal__info-heading']}>
          <h3>Персональные данные</h3>
        </div>
        <div className={styles.personal__details}>
          <div className={styles.details__group}>
            <label className={styles.passenger__surname}>Фамилия</label>
            <input
              type="text"
              className={styles.passenger__input}
              value="Мартынюк"
            />
          </div>

          <div className={styles.details__group}>
            <label className={styles.passenger__name}>Имя</label>
            <input
              type="text"
              className={styles.passenger__input}
              value="Ирина"
            />
          </div>
          <div className={styles.details__group}>
            <label className={styles['passenger__patronomic-name']}>
              Отчество
            </label>
            <input
              type="text"
              className={styles.passenger__input}
              value="Эдуардовна"
            />
          </div>
        </div>
        <div className={styles.details__contacts}>
          <div className={styles.contacts__phone}>
            <label>Контактный телефон</label>
            <input
              type="text"
              placeholder="+7 ___ ___ __ __"
              className={styles.passenger__input}
            />
          </div>
          <div className={styles.contacts__email}>
            <label>E-mail</label>
            <input
              type="text"
              placeholder="inbox@gmail.ru"
              className={styles.passenger__input}
            />
          </div>
        </div>

        <div className={styles.payment__method}>
          <div className={styles['payment__method-heading']}>
            <h3>Способ оплаты</h3>
          </div>
          <div className={styles.payment__online}>
            <input type="checkbox" name="online" />
            <label> Онлайн</label>
          </div>
          <div className={styles['payment__online-options']}>
            <div>Банковской картой</div>
            <div>PayPal</div>
            <div>Visa QIWI Wallet</div>
          </div>
          <div className={styles.payment__cash}>
            <input type="checkbox" name="cash" />
            <label> Наличными</label>
          </div>
        </div>
      </section>
      <button
        className={styles['payment__buy']}
        onClick={() => {
          navigate('/tickets/check');
        }}
      >
        Купить билеты
      </button>
    </div>
  );
}
