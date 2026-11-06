import styles from './PassengerPage.module.css';
import PassengerForm, {
  Passenger,
} from '../../components/PassengerForm/PassengerForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateOrder } from '../../store/slices/orderSlice';
import { SeatInfo } from '../../store/slices/orderSlice';

export default function PassengerPage(): React.ReactElement {
  const [isFormValid, setIsFormValid] = useState(false);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const routeInfo = useAppSelector((state) => state.routes.selectedRoute);
  const savedReduxSeats =
    useAppSelector((state) => state.order.departure.seats) || [];

  const sendPassengerForm = () => {
    if (!isFormValid) return;
    const updatedReduxSeats: SeatInfo[] = savedReduxSeats.map(
      (reduxTicket, index) => {
        const passengerData = passengers[index];

        return {
          ...reduxTicket,
          person_info: {
            is_adult: passengerData?.is_adult,
            first_name: passengerData?.first_name,
            last_name: passengerData?.last_name,
            patronymic: passengerData?.patronymic,
            gender: passengerData?.gender,
            birthday: passengerData?.birthday,
            document_type: passengerData?.document_type,
            document_data: passengerData?.document_data,
          },
        };
      }
    );

    dispatch(
      updateOrder({
        key: 'departure',
        value: {
          route_direction_id: routeInfo?._id || '',
          seats: updatedReduxSeats,
        },
      })
    );

    navigate('/tickets/payment');
  };

  return (
    <div className={styles.passengers__container}>
      <PassengerForm
        onValidityChange={(valid) => setIsFormValid(valid)}
        onPassengersChange={(data) => setPassengers(data)}
      />
      <button
        className={styles['passenger__next-step']}
        disabled={!isFormValid}
        onClick={sendPassengerForm}
      >
        Далее
      </button>
    </div>
  );
}
