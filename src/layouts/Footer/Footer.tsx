import React from 'react';
import styles from './Footer.module.css';

export function Footer(): React.ReactElement {
  const handleScrollToTop = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const topElement =
      document.querySelector('header') || document.getElementById('root');

    if (topElement) {
      topElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__getconnected}>
          <h3 className={styles.footer__title}>Свяжитесь с нами</h3>

          <div className={styles.footer__contact}>
            <img
              src="assets/images/phone.png"
              className={`${styles.footer__icon} ${styles.footer__icon_phone}`}
            ></img>
            <span className={styles.footer__text}>8(800) 000-00-00</span>
          </div>

          <div className={styles.footer__contact}>
            <img
              src="assets/images/e-mail.png"
              className={`${styles.footer__icon} ${styles.footer__icon_mail}`}
            ></img>
            <span className={styles.footer__text}>inbox@mail.ru</span>
          </div>

          <div className={styles.footer__contact}>
            <img
              src="assets/images/skype.png"
              className={`${styles.footer__icon} ${styles.footer__icon_skype}`}
            ></img>
            <span className={styles.footer__text}>tu.train.tickets</span>
          </div>

          <div className={styles.footer__contact}>
            <img
              src="assets/images/location.png"
              className={`${styles.footer__icon} ${styles.footer__icon_address}`}
            ></img>
            <span className={styles.footer__text}>
              г.Москва
              <br />
              ул. Московская 27-35
              <br />
              555 555
            </span>
          </div>
        </div>
        <div className={styles.footer__getsubscribed}>
          <h3 className={styles.footer__title}>Подписка</h3>
          <p className={styles.footer__subtitle}>Будьте в курсе событий</p>

          <form
            className={`${styles.footer__form} ${styles['subscribe-form']}`}
          >
            <input
              className={styles['subscribe-form__input']}
              placeholder="e-mail"
            />
            <button className={styles['subscribe-form__submit']} type="submit">
              ОТПРАВИТЬ
            </button>
          </form>

          <h3 className={styles['footer__sub-title']}>Подписывайтесь на нас</h3>
          <div className={`${styles.footer__socials} ${styles.socials}`}>
            <a
              href="#"
              className={`${styles.socials__link} ${styles.socials__link_youtube}`}
            ></a>
            <a
              href="#"
              className={`${styles.socials__link} ${styles.socials__link_in}`}
            ></a>
            <a
              href="#"
              className={`${styles.socials__link} ${styles.socials__google_plus}`}
            ></a>
            <a
              href="#"
              className={`${styles.socials__link} ${styles.socials__link_facebook}`}
            ></a>
            <a
              href="#"
              className={`${styles.socials__link} ${styles.socials__link_twitter}`}
            ></a>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <div className={styles.footer__logo}>Лого</div>
        <button
          type="button"
          className={styles['footer__up-button']}
          aria-label="Наверх"
          onClick={handleScrollToTop}
        ></button>
        <div className={styles.footer__copyright}>2018 WEB</div>
      </div>
    </footer>
  );
}
