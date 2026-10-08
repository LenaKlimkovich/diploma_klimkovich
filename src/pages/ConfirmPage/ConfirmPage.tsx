import styles from './ConfirmPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function ConfirmPage(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div className={styles.confirm__container}>
      <div className={styles.confirm__popup}>
        <span className={styles.popup__slogan}>Благодарим Вас за заказ!</span>
        <div className={styles.popup__heading}>
          <div className={styles.popup__order}>№Заказа 285АА</div>
          <div className={styles.popup__price}>
            сумма <span>7 760</span>
            <img src="/assets/images/ruble.png" alt="Rouble" />
          </div>
        </div>
        <div className={styles.popup__tips}>
          <div className={styles.tips__container}>
            <div className={styles.tip}>
              <img src="/assets/images/computer.png" alt="Computer" />
              <p>билеты будут отправлены на ваш e-mail</p>
            </div>

            <div className={styles.tip}>
              <img src="/assets/images/tickets.png" alt="Computer" />
              <p>
                <span>распечатайте</span> и сохраняйте билеты до даты поездки
              </p>
            </div>
            <div className={styles.tip}>
              <img src="/assets/images/train-driver.png" alt="Computer" />
              <p>
                <span>предьявите</span> распечатанные билеты при посадке
              </p>
            </div>
          </div>
        </div>
        <div className={styles.passenger__personal}>
          <span className={styles.passenger__name}>Ирина Эдуардовна!</span>
          <p className={styles.order__confirmation}>
            Ваш заказ успешно оформлен. <br />В ближайшее время с вами свяжется
            наш оператор для подтверждения.
          </p>
          <p className={styles['order__thank-you']}>
            Благодарим Вас за оказанное доверие и желаем приятного путешествия!
          </p>
        </div>
        <div className={styles.assesment}>
          <div className={styles.assesment__container}>
            <div>Оценить сервис</div>
            <img src="/assets/images/assesment-star.png" alt="Assesment star" />
            <img src="/assets/images/assesment-star.png" alt="Assesment star" />
            <img src="/assets/images/assesment-star.png" alt="Assesment star" />
            <img src="/assets/images/assesment-star.png" alt="Assesment star" />
            <img src="/assets/images/assesment-star.png" alt="Assesment star" />
          </div>
          <button
            className={styles['back-to-main']}
            onClick={() => {
              navigate('/');
            }}
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}
