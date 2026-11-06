import { useAppSelector } from '../../store/hooks';
import styles from './ConfirmPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const generateOrderNumber = (): string => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
  const numbers = '0123456789';

  let numPart = '';
  for (let i = 0; i < 3; i++) {
    numPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  let letPart = '';
  for (let i = 0; i < 2; i++) {
    letPart += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return `${numPart}${letPart}`;
};

export default function ConfirmPage(): React.ReactElement {
  const order = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const [orderNumber] = useState<string>(() => generateOrderNumber());

  return (
    <div className={styles.confirm__container}>
      <div className={styles.confirm__popup}>
        <span className={styles.popup__slogan}>Благодарим Вас за заказ!</span>
        <div className={styles.popup__heading}>
          <div className={styles.popup__order}>№Заказа {orderNumber}</div>
          <div className={styles.popup__price}>
            сумма{' '}
            <span>
              {order.prices.reduce(
                (total, currentPrice) => total + currentPrice.price,
                0
              )}
            </span>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/ruble.png`}
              alt="Rouble"
            />
          </div>
        </div>
        <div className={styles.popup__tips}>
          <div className={styles.tips__container}>
            <div className={styles.tip}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/computer.png`}
                alt="Computer"
              />
              <p>билеты будут отправлены на ваш e-mail</p>
            </div>

            <div className={styles.tip}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/tickets.png`}
                alt="Computer"
              />
              <p>
                <span>распечатайте</span> и сохраняйте билеты до даты поездки
              </p>
            </div>
            <div className={styles.tip}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/train-driver.png`}
                alt="Computer"
              />
              <p>
                <span>предьявите</span> распечатанные билеты при посадке
              </p>
            </div>
          </div>
        </div>
        <div className={styles.passenger__personal}>
          <span
            className={styles.passenger__name}
          >{`${order.user.first_name} ${order.user.patronymic}!`}</span>
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
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/assesment-star.png`}
              alt="Assesment star"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/assesment-star.png`}
              alt="Assesment star"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/assesment-star.png`}
              alt="Assesment star"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/assesment-star.png`}
              alt="Assesment star"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/assesment-star.png`}
              alt="Assesment star"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/assesment-star.png`}
              alt="Assesment star"
            />
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
