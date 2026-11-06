import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Selection, {
  SelectedSeat,
  AmenityType,
} from '../../components/SeatsSelection/Selection';
import styles from './SeatsPage.module.css';
import { updateOrder, SeatInfo } from '../../store/slices/orderSlice';
import { SeatsPrices } from '../../store/slices/orderSlice';

export default function SeatsPage(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const route = useAppSelector((state) => state.routes.selectedRoute);
  const stateSeats = useAppSelector((state) => state.seats);

  const [departureSeats, setDepartureSeats] = useState<
    Record<string, SelectedSeat[]>
  >({});
  const [arrivalSeats, setArrivalSeats] = useState<
    Record<string, SelectedSeat[]>
  >({});

  const [departureAmenities, setDepartureAmenities] = useState<
    Record<string, Exclude<AmenityType, 'none'>[]>
  >({});
  const [arrivalAmenities, setArrivalAmenities] = useState<
    Record<string, Exclude<AmenityType, 'none'>[]>
  >({});

  const [departureChildrenNoSeat, setDepartureChildrenNoSeat] =
    useState<number>(0);
  const [arrivalChildrenNoSeat, setArrivalChildrenNoSeat] = useState<number>(0);

  const handleDepartureSeatsChange = useCallback(
    (seats: Record<string, SelectedSeat[]>) => {
      setDepartureSeats(seats);
    },
    []
  );

  const handleArrivalSeatsChange = useCallback(
    (seats: Record<string, SelectedSeat[]>) => {
      setArrivalSeats(seats);
    },
    []
  );

  const handleDepartureAmenitiesChange = useCallback(
    (amenities: Record<string, Exclude<AmenityType, 'none'>[]>) => {
      setDepartureAmenities(amenities);
    },
    []
  );

  const handleArrivalAmenitiesChange = useCallback(
    (amenities: Record<string, Exclude<AmenityType, 'none'>[]>) => {
      setArrivalAmenities(amenities);
    },
    []
  );

  const handleDepartureChildrenNoSeatChange = useCallback((count: number) => {
    setDepartureChildrenNoSeat(count);
  }, []);

  const handleArrivalChildrenNoSeatChange = useCallback((count: number) => {
    setArrivalChildrenNoSeat(count);
  }, []);

  if (!route) {
    return <></>;
  }

  const getSeatPrice = (index: number, type: string, coach: any) => {
    if (!coach) return 0;
    const { top_price, bottom_price, side_price, price } = coach;
    const isEven = index % 2 === 0;

    if (type === 'first') return price || bottom_price || 0;
    if (index <= 32 && (type === 'second' || type === 'third')) {
      return isEven ? top_price : bottom_price;
    }
    if (type === 'third' && index >= 33 && index <= 48) return side_price;
    if (type === 'fourth' && index >= 1 && index <= 62) {
      return isEven ? top_price : bottom_price;
    }
    return bottom_price || 0;
  };

  const handleNextClick = () => {
    let totalAdultPrice = 0;
    let totalChildPrice = 0;

    const directions = [
      {
        key: 'departure' as const,
        seatsData: departureSeats,
        routeInfo: route.departure,
        wagons: stateSeats.departure,
        wagonsAmenities: departureAmenities,
        childrenNoSeatCount: departureChildrenNoSeat,
      },
      {
        key: 'arrival' as const,
        seatsData: arrivalSeats,
        routeInfo: route.arrival,
        wagons: stateSeats.arrival,
        wagonsAmenities: arrivalAmenities,
        childrenNoSeatCount: arrivalChildrenNoSeat,
      },
    ];

    directions.forEach(
      ({
        key,
        seatsData,
        routeInfo,
        wagons,
        wagonsAmenities,
        childrenNoSeatCount,
      }) => {
        if (key === 'arrival' && !route.arrival) return;

        const updatedReduxSeats: SeatInfo[] = [];
        let assignedChildrenNoSeat = 0;

        Object.entries(seatsData).forEach(([wagonId, seatsList]) => {
          const currentWagon = wagons?.find(
            (w: any) => w.coach._id === wagonId
          );
          const coach = currentWagon?.coach;

          seatsList.forEach((seat) => {
            let includeChildrenSeat = false;
            if (
              seat.seatType === 'adult' &&
              assignedChildrenNoSeat < childrenNoSeatCount
            ) {
              includeChildrenSeat = true;
              assignedChildrenNoSeat += 1;
            }

            updatedReduxSeats.push({
              coach_id: wagonId,
              seat_number: seat.index,
              is_child: seat.seatType === 'child',
              include_children_seat: includeChildrenSeat,
              person_info: {
                is_adult: seat.seatType === 'adult',
                first_name: '',
                last_name: '',
                patronymic: '',
                gender: true,
                birthday: '',
                document_type: 'Паспорт',
                document_data: '',
              },
            });

            if (coach) {
              let seatPrice = getSeatPrice(seat.index, coach.class_type, coach);

              if (seat.seatType === 'child') {
                seatPrice = Math.round(seatPrice * 0.5);
                totalChildPrice += seatPrice;
              } else {
                totalAdultPrice += seatPrice;
              }

              const wagonAmenities = wagonsAmenities[wagonId] || [];
              wagonAmenities.forEach((amenity) => {
                const priceKey = `${amenity}_price`;
                const costPerPerson = (coach as any)[priceKey] || 0;

                if (seat.seatType === 'child') {
                  totalChildPrice += costPerPerson;
                } else {
                  totalAdultPrice += costPerPerson;
                }
              });
            }
          });
        });

        dispatch(
          updateOrder({
            key,
            value: {
              route_direction_id: routeInfo?._id || '',
              seats: updatedReduxSeats,
            },
          })
        );
      }
    );

    const pricesPayload: SeatsPrices[] = [];
    if (totalAdultPrice > 0) {
      pricesPayload.push({ type: 'adult', price: totalAdultPrice });
    }
    if (totalChildPrice > 0) {
      pricesPayload.push({ type: 'child', price: totalChildPrice });
    }

    dispatch(
      updateOrder({
        key: 'prices',
        value: pricesPayload,
      })
    );

    navigate('/tickets/passengers');
  };

  return (
    <>
      <h3 className={styles['seats-selection__title']}>Выбор мест</h3>

      <Selection
        destination="departure"
        onSeatsChange={handleDepartureSeatsChange}
        onAmenitiesChange={handleDepartureAmenitiesChange}
        onChildrenNoSeatChange={handleDepartureChildrenNoSeatChange}
      />

      {route.arrival && (
        <Selection
          destination="arrival"
          onSeatsChange={handleArrivalSeatsChange}
          onAmenitiesChange={handleArrivalAmenitiesChange}
          onChildrenNoSeatChange={handleArrivalChildrenNoSeatChange}
        />
      )}

      <button
        type="button"
        className={styles['seats-selection__next']}
        onClick={handleNextClick}
      >
        Далее
      </button>
    </>
  );
}
