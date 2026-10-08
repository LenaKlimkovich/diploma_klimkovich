import Selection from '../../components/SeatsSelection/Selection';
import styles from './SeatsSelection.module.css';
import { useNavigate } from 'react-router-dom';

export default function SeatsPage(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <h3 className={styles['seats-selection__title']}>Выбор мест</h3>
      <Selection />
      <Selection isReturn={true} />
      <button
        type="button"
        className={styles['seats-selection__next']}
        onClick={() => {
          navigate('/tickets/passengers');
        }}
      >
        Далее
      </button>
    </>
  );
}
