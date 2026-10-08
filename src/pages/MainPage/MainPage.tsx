import { ReactElement } from 'react';
import styles from './MainPage.module.css';

export const MainPage = (): ReactElement => {
  return (
    <div className={styles['main-page']}>
      <section id="about-us" className={styles['main-page__about-us']}>
        <h2 className={styles['main-page__title']}>О нас</h2>
        <div className={styles['main-page__about-container']}>
          <p className={styles['main-page__text']}>
            Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы
            наблюдаем, как с каждым днем <br />
            все больше людей заказывают жд билеты через интернет.
          </p>
          <p className={styles['main-page__text']}>
            Сегодня можно заказать железнодорожные билеты онлайн всего в 2
            клика, но стоит ли это делать?
            <br /> Мы расскажем о преимуществах заказа через интернет.
          </p>
          <p className={styles['main-page__text']}>
            <strong>
              Покупать жд билеты дешево можно за 90 суток до отправления поезда.
              <br />
              Благодаря динамическому ценообразованию цена на билеты в это время
              самая низкая.
            </strong>
          </p>
        </div>
      </section>

      <section id="how" className={styles['main-page__how']}>
        <div className={styles['how__top']}>
          <h2 className={styles['main-page__title']}>Как это работает</h2>
          <button className={styles['main-page__more-button']}>
            Узнать больше
          </button>
        </div>
        <div className={styles['how__bottom']}>
          <div className={styles['how__advantage']}>
            <div className={styles['how__advantage-order']}></div>
            <div className={styles['how__advantage-text']}>
              Удобный заказ <br />
              на сайте
            </div>
          </div>
          <div className={styles['how__advantage']}>
            <div className={styles['how__advantage-office']}></div>
            <div className={styles['how__advantage-text']}>
              Нет необходимости ехать в офис
            </div>
          </div>
          <div className={styles['how__advantage']}>
            <div className={styles['how__advantage-selection']}></div>
            <div className={styles['how__advantage-text']}>
              Огромный выбор направлений
            </div>
          </div>
        </div>
      </section>

      <section id="feedback" className={styles['main-page__feedback']}>
        <h2 className={styles['main-page__title']}>Отзывы</h2>
        <div
          className={`${styles['main-page__feedback-container']} ${styles['feedback-list']}`}
        >
          <div
            className={`${styles['feedback-list__item']} ${styles['feedback-card']}`}
          >
            <img
              className={styles['feedback-card_img']}
              src="/assets/images/feedback-first.png"
              alt="Екатерина Вальнова"
            />
            <div className={styles['feedback-card_container']}>
              <h4>Екатерина Вальнова</h4>
              <div className={styles['feedback-card_content']}>
                <p className={styles['feedback-card__text']}>
                  <img
                    className={`${styles['quotation-mark']} ${styles['quotation-mark--start']}`}
                    src="/assets/images/quotation-start.png"
                    alt="Кавычка открывается"
                  />
                  Доброжелательные подсказки на всех этапах помогут правильно
                  заполнить поля и без затруднений купить авиа или ж/д билет,
                  даже если вы заказываете онлайн билет впервые.
                  <img
                    className={`${styles['quotation-mark']} ${styles['quotation-mark--end']}`}
                    src="/assets/images/quotation-end.png"
                    alt="Кавычка закрывается"
                  />
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${styles['feedback-list__item']} ${styles['feedback-card']}`}
          >
            <img
              className={styles['feedback-card_img']}
              src="/assets/images/feedback-second.png"
              alt="Евгений Стрыкало"
            />
            <div className={styles['feedback-card_container']}>
              <h4>Евгений Стрыкало</h4>
              <div className={styles['feedback-card_content']}>
                <p className={styles['feedback-card__text']}>
                  <img
                    className={`${styles['quotation-mark']} ${styles['quotation-mark--start']}`}
                    src="/assets/images/quotation-start.png"
                    alt="Кавычка открывается"
                  />
                  СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и
                  за 3 часа до отправления мы пришлем вам СМС-напоминание о
                  поездке.
                  <img
                    className={`${styles['quotation-mark']} ${styles['quotation-mark--end']}`}
                    src="/assets/images/quotation-end.png"
                    alt="Кавычка закрывается"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          className={styles['feedback-card__dots']}
          src="/assets/images/feedback-dots.png"
          alt="Feedback dots"
        />
      </section>
    </div>
  );
};
