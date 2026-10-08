import React from 'react';
import styles from './Header.module.css';
import TicketForm from '../../components/TicketForm/TicketForm';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

export function Header(): React.ReactElement {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isConfirmPage = location.pathname === '/confirm';

  let headerClass = styles['header__other'];
  if (isHomePage) headerClass = styles['header__home'];
  if (isConfirmPage) headerClass = styles['header__confirm'];

  const bottomContainerClass = isHomePage
    ? styles['header__bottom-container-home']
    : styles['header__bottom-container-other'];

  return (
    <header className={`${styles['header']} ${headerClass}`}>
      <div className={styles['header__top-container']}>
        <div className={styles['header__logo']}>Лого</div>
        <nav className={styles['header__navigation']}>
          <ul className={styles.menu}>
            <li className={styles['menu__item']}>
              <Link to="/#about-us" className={styles['menu__link']}>
                О нас
              </Link>
            </li>
            <li className={styles['menu__item']}>
              <Link to="/#how" className={styles['menu__link']}>
                Как это работает
              </Link>
            </li>
            <li className={styles['menu__item']}>
              <Link to="/#feedback" className={styles['menu__link']}>
                Отзывы
              </Link>
            </li>
            <li className={styles['menu__item']}>
              <Link to="/#contacts" className={styles['menu__link']}>
                Контакты
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {!isConfirmPage && (
        <div className={`${bottomContainerClass}`}>
          {isHomePage && (
            <div className={styles['header__slogan']}>
              Вся жизнь - <strong>путешествие!</strong>
            </div>
          )}
          <TicketForm />
        </div>
      )}
      {isHomePage && <hr className={styles.header__underline}></hr>}
    </header>
  );
}
