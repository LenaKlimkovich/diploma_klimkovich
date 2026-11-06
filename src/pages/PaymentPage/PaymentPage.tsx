import { useAppDispatch } from '../../store/hooks';
import styles from './PaymentPage.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateOrder } from '../../store/slices/orderSlice';

interface Form {
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  payment_method: string;
}

export default function PaymentPage(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form, changeForm] = useState<Form>({
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: '',
  });

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');

    if (phoneNumber.length === 0) return '';

    if (phoneNumber.length <= 1) return `+7`;
    if (phoneNumber.length <= 4) return `+7 (${phoneNumber.slice(1, 4)}`;
    if (phoneNumber.length <= 7)
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}`;
    if (phoneNumber.length <= 9)
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}`;
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateOrder({
        key: 'user',
        value: {
          first_name: form.first_name,
          last_name: form.last_name,
          patronymic: form.patronymic,
          phone: form.phone,
          email: form.email,
          payment_method: form.payment_method,
        },
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.payment__container}>
      <section className={styles.payment__details}>
        <div className={styles['personal__info-heading']}>
          <h3>Персональные данные</h3>
        </div>
        <div className={styles.personal__details}>
          <div className={styles.details__group}>
            <label className={styles.passenger__surname}>Фамилия</label>
            <input
              type="text"
              required
              className={styles.passenger__input}
              value={form?.last_name}
              onChange={(e) => {
                const value = e.target.value;
                changeForm((prevForm) => ({
                  ...prevForm,
                  last_name: value,
                }));
              }}
            />
          </div>

          <div className={styles.details__group}>
            <label className={styles.passenger__name}>Имя</label>
            <input
              type="text"
              required
              className={styles.passenger__input}
              value={form?.first_name}
              onChange={(e) => {
                const value = e.target.value;
                changeForm((prevForm) => ({
                  ...prevForm,
                  first_name: value,
                }));
              }}
            />
          </div>
          <div className={styles.details__group}>
            <label className={styles['passenger__patronomic-name']}>
              Отчество
            </label>
            <input
              type="text"
              required
              className={styles.passenger__input}
              value={form?.patronymic}
              onChange={(e) => {
                const value = e.target.value;
                changeForm((prevForm) => ({
                  ...prevForm,
                  patronymic: value,
                }));
              }}
            />
          </div>
        </div>
        <div className={styles.details__contacts}>
          <div className={styles.contacts__phone}>
            <label>Контактный телефон</label>
            <input
              type="text"
              required
              placeholder="+7 ___ ___ __ __"
              className={styles.passenger__input}
              value={form?.phone}
              onChange={(e) => {
                const value = e.target.value;
                const formattedValue = formatPhoneNumber(value);
                changeForm((prevForm) => ({
                  ...prevForm,
                  phone: formattedValue,
                }));
              }}
            />
          </div>
          <div className={styles.contacts__email}>
            <label>E-mail</label>
            <input
              type="email"
              required
              placeholder="inbox@gmail.ru"
              className={styles.passenger__input}
              value={form?.email}
              onChange={(e) => {
                const value = e.target.value;
                changeForm((prevForm) => ({
                  ...prevForm,
                  email: value,
                }));
              }}
            />
          </div>
        </div>

        <div className={styles.payment__method}>
          <div className={styles['payment__method-heading']}>
            <h3>Способ оплаты</h3>
          </div>
          <div className={styles.payment__online}>
            <input
              type="radio"
              required
              name="payment_method"
              value="online"
              checked={form.payment_method === 'online'}
              onChange={(e) => {
                const value = e.target.value;
                changeForm((prevForm) => ({
                  ...prevForm,
                  payment_method: value,
                }));
              }}
            />
            <label>Онлайн</label>
          </div>
          <div className={styles['payment__online-options']}>
            <div>Банковской картой</div>
            <div>PayPal</div>
            <div>Visa QIWI Wallet</div>
          </div>
          <div className={styles.payment__cash}>
            <input
              type="radio"
              required
              name="payment_method"
              value="cash"
              checked={form.payment_method === 'cash'}
              onChange={(e) => {
                const value = e.target.value;
                changeForm((prevForm) => ({
                  ...prevForm,
                  payment_method: value,
                }));
              }}
            />
            <label>Наличными</label>
          </div>
        </div>
      </section>
      <button
        type="submit"
        className={styles['payment__buy']}
        onClick={() => {
          navigate('/tickets/check');
        }}
      >
        Купить билеты
      </button>
    </form>
  );
}
