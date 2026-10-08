import styles from './PassengerPage.module.css';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { Outlet } from 'react-router-dom';
import PassengerForm from '../../components/PassengerForm/PassengerForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PassengerPage(): React.ReactElement {
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.passengers__container}>
      <PassengerForm onValidityChange={(valid) => setIsFormValid(valid)} />
      <button
        className={styles['passenger__next-step']}
        disabled={!isFormValid}
        onClick={() => {
          navigate('/tickets/payment');
        }}
      >
        Далее
      </button>
    </div>
  );
}
