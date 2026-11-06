import styles from './Selection.module.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { WagonData } from '../../store/slices/seatsSlice';
import { CoachCard } from '../CoachCard/CoachCard';
import CoachMap from '../CoachMap/CoachMap';
import { formattedTime, formattedDuration } from '../../utils/timeFormatters';

export type AmenityType = 'none' | 'air-conditioning' | 'wifi' | 'linens';

export type PassengerType = 'none' | 'adult' | 'child' | 'noseat';

export interface SelectedSeat {
  index: number;
  seatType: PassengerType;
}

export interface SelectionProps {
  destination?: 'departure' | 'arrival';
  onSeatsChange: (seats: Record<string, SelectedSeat[]>) => void;
  onAmenitiesChange: (
    amenities: Record<string, Exclude<AmenityType, 'none'>[]>
  ) => void;
  onChildrenNoSeatChange?: (count: number) => void;
}

export default function Selection({
  destination = 'departure',
  onSeatsChange,
  onAmenitiesChange,
  onChildrenNoSeatChange,
}: SelectionProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<
    'none' | 'first' | 'second' | 'third' | 'fourth'
  >('none');

  const [activePassengerType, setActivePassengerType] =
    useState<PassengerType>('adult');

  // Структура данных будет вида: { "id_вагона_1": ["wifi", "drinks"], "id_вагона_2": ["bedding"] }
  const [activeAmenities, setActiveAmenities] = useState<
    Record<string, Exclude<AmenityType, 'none'>[]>
  >({});

  const [activeWagons, setActiveWagons] = useState<WagonData[]>([]);
  // Структура данных: { "id_вагона_1":, "id_вагона_2": [1, 2] }
  const [selectedSeats, setSelectedSeats] = useState<
    Record<string, SelectedSeat[]>
  >({});

  useEffect(() => {
    onAmenitiesChange(activeAmenities);
  }, [activeAmenities, onAmenitiesChange]);

  const [adults, setAdults] = useState<number | ''>(0);
  const [children, setChildren] = useState<number | ''>(0);
  const [childrenNoSeat, setChildrenNoSeat] = useState<number | ''>(0);
  const MAX_SEATS_ADULTS = 5;
  const MAX_SEATS_CHILDREN = 4;
  const remainingAdultSeats = MAX_SEATS_ADULTS - Number(adults);
  const remainingChildrenSeats = MAX_SEATS_CHILDREN - Number(children);

  const seats = useAppSelector((state) => state.seats);
  const route = useAppSelector((state) => state.routes.selectedRoute);
  const navigate = useNavigate();

  useEffect(() => {
    if (onChildrenNoSeatChange) {
      onChildrenNoSeatChange(childrenNoSeat === '' ? 0 : childrenNoSeat);
    }
  }, [childrenNoSeat, onChildrenNoSeatChange]);

  useEffect(() => {
    onSeatsChange(selectedSeats);
  }, [selectedSeats, onSeatsChange]);

  useEffect(() => {
    if (!route) {
      navigate('/tickets');
    }
  }, [route, navigate]);

  useEffect(() => {
    setActivePassengerType('adult');
    setActiveWagons([]);
    setSelectedSeats({});
  }, [activeTab]);

  if (!route) {
    return (
      <div className={styles['seats-selection__loading']}>
        Перенаправление к списку поездов...
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const type = target.name;
    if (target.value === '') {
      if (type === 'adults') setAdults('');
      if (type === 'children') setChildren('');
      if (type === 'childrenNoSeat') setChildrenNoSeat('');
      return;
    }
    let value = parseInt(target.value, 10);
    if (type === 'children' && value >= 0 && value <= remainingChildrenSeats) {
      setChildren(value);
    }
    if (type === 'adults' && value >= 0 && value <= remainingAdultSeats) {
      setAdults(value);
    }
    if (type === 'childrenNoSeat' && value >= 0 && value <= Number(adults)) {
      setChildrenNoSeat(value);
    }
  };

  const currentTrainInfo = route[destination];
  const currentWagons = seats[destination];
  const existingTypes = currentWagons.filter(
    (wagon) => wagon.coach.class_type === activeTab
  );

  const handlerAddAmenity = (
    wagonId: string,
    amenity: Exclude<AmenityType, 'none'>
  ) => {
    setActiveAmenities((prev) => {
      const currentWagonAmenities = prev[wagonId] || [];

      const updatedAmenities = currentWagonAmenities.includes(amenity)
        ? currentWagonAmenities.filter((item) => item !== amenity)
        : [...currentWagonAmenities, amenity];

      return {
        ...prev,
        [wagonId]: updatedAmenities,
      };
    });
  };

  const handlePassengerTypeClick = (type: PassengerType) => {
    setActivePassengerType(activePassengerType === type ? 'none' : type);
  };

  const handleSeatClick = (wagonId: string, seatNumber: number) => {
    const isSeatSelected = selectedSeats[wagonId]?.some(
      (seat) => seat.index === seatNumber
    );

    if (!isSeatSelected) {
      if (activePassengerType === 'adult') {
        const currentAdultCount = Object.values(selectedSeats)
          .flat()
          .filter((s) => s.seatType === 'adult').length;

        if (currentAdultCount >= Number(adults)) {
          return;
        }
      }

      if (activePassengerType === 'child') {
        const currentChildCount = Object.values(selectedSeats)
          .flat()
          .filter((s) => s.seatType === 'child').length;

        if (currentChildCount >= Number(children)) {
          return;
        }
      }
    }

    setSelectedSeats((prev) => {
      const currentWagonSeats = prev[wagonId] || [];

      const isSelected = currentWagonSeats?.some(
        (seat) => seat.index === seatNumber
      );

      let updatedSeats: SelectedSeat[];

      if (isSelected) {
        updatedSeats = currentWagonSeats.filter(
          (seat) => seat.index !== seatNumber
        );
      } else {
        updatedSeats = [
          ...currentWagonSeats,
          { index: seatNumber, seatType: activePassengerType },
        ];
      }
      return {
        ...prev,
        [wagonId]: updatedSeats,
      };
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className={styles['seats-selection']}>
      <div
        className={`${styles['seats-selection__back']} ${destination === 'arrival' ? styles['seats-selection__back_return'] : ''}`}
      >
        <img
          className={`${styles['seats-selection__back-arrow']} ${destination === 'arrival' ? styles['seats-selection__back-arrow_return'] : ''}`}
          src={`${process.env.PUBLIC_URL}/assets/images/arrow-to-black.png`}
          alt="Arrow to"
        />
        <button
          type="button"
          className={styles['seats-selection__back-btn']}
          onClick={handleBackClick}
        >
          Выбрать другой поезд
        </button>
      </div>

      {/* Компактная плашка текущего поезда */}
      <div className={styles['seats-selection__train-info']}>
        <div className={styles['train-info__number-block']}>
          <div className={styles['train-info__icon']}></div>
          <div>
            <div className={styles['train-info__number']}>
              {currentTrainInfo.train.name}
            </div>
            <div className={styles['train-info__route']}>
              <span>{currentTrainInfo.from.city.name} →</span>
              <span>{currentTrainInfo.to.city.name}</span>
            </div>
          </div>
        </div>
        <div className={styles['train-info__time-block']}>
          <div className={styles['train-info__time']}>
            {formattedTime('from', currentTrainInfo)}
          </div>
          <div className={styles['train-info__station']}>
            <span>{currentTrainInfo.from.city.name}</span>
            <span>{currentTrainInfo.from.railway_station_name}</span>
          </div>
        </div>
        <img
          className={`${styles['train-info__arrow-to']} ${destination === 'arrival' ? styles['train-info__arrow-to_return'] : ''}`}
          src={`${process.env.PUBLIC_URL}/assets/images/arrow-to.png`}
          alt="Arrow to"
        />
        <div className={styles['train-info__time-block']}>
          <div className={styles['train-info__time']}>
            {formattedTime('to', currentTrainInfo)}
          </div>
          <div className={styles['train-info__station']}>
            <span>{currentTrainInfo.to.city.name}</span>
            <span>{currentTrainInfo.to.railway_station_name}</span>
          </div>
        </div>
        <div className={styles['train-info__duration']}>
          <img
            className={styles['train-info__clock']}
            src={`${process.env.PUBLIC_URL}/assets/images/clock.png`}
            alt="Clock"
          />
          <div className={styles['train-info__hours-minutes']}>
            <span>{formattedDuration(currentTrainInfo)}</span>
          </div>
        </div>
      </div>
      <section className={styles['seats-selection__tickets-number']}>
        <h1 className={styles['seats-selection__title-number']}>
          Количество билетов
        </h1>
        <form className={styles['seats-selection__tickets-grid']}>
          <div
            className={`${styles['ticket-counter']} ${activePassengerType === 'adult' ? styles['ticket-counter_active'] : ''}`}
            onClick={() => handlePassengerTypeClick('adult')}
          >
            <div className={styles['ticket-counter__row']}>
              <span className={styles['ticket-counter__label']}>
                Взрослых -
              </span>
              <input
                className={styles['ticket-counter__input']}
                id="seats-count"
                name="adults"
                type="number"
                min="0"
                max={MAX_SEATS_ADULTS}
                value={adults}
                onChange={handleInputChange}
              />
            </div>
            <p className={styles['ticket-counter__hint-adults']}>
              <>Можно добавить еще {remainingAdultSeats} пассажиров</>
            </p>
          </div>

          <div
            className={`${styles['ticket-counter']} ${activePassengerType === 'child' ? styles['ticket-counter_active'] : ''}`}
            onClick={() => handlePassengerTypeClick('child')}
          >
            <div className={styles['ticket-counter__row']}>
              <span className={styles['ticket-counter__label']}>Детских -</span>
              <input
                className={styles['ticket-counter__input']}
                id="seats-count"
                name="children"
                type="number"
                min="0"
                max={MAX_SEATS_CHILDREN}
                value={children}
                onChange={handleInputChange}
              />
            </div>
            {Number(adults) > 0 && (
              <p className={styles['ticket-counter__hint-children']}>
                <>
                  Можно добавить еще {remainingChildrenSeats} детей до 10 лет.
                  Свое место в вагоне, как у взрослых, но дешевле в среднем на
                  50-65%
                </>
              </p>
            )}
          </div>
          <div className={styles['ticket-counter']}>
            <div className={styles['ticket-counter__row']}>
              <span className={styles['ticket-counter__label']}>
                Детских «без места» -
              </span>
              <input
                className={styles['ticket-counter__input']}
                id="seats-count"
                name="childrenNoSeat"
                type="number"
                min="0"
                max={adults}
                value={childrenNoSeat}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </section>
      <section className={styles['seats-selection__car-type']}>
        <h1 className={styles['seats-selection__title']}>Тип вагона</h1>
        <div className={styles['seats-selection__tabs']}>
          <button
            className={`${styles['tab-btn']} ${activeTab === 'fourth' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('fourth')}
          >
            <img
              className={styles['tab-btn__icon']}
              src={`${process.env.PUBLIC_URL}/assets/images/sitting-passenger.svg`}
              alt="Sitting passenger"
            />{' '}
            Сидячий
          </button>

          <button
            className={`${styles['tab-btn']} ${activeTab === 'third' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('third')}
          >
            <img
              className={styles['tab-btn__icon']}
              src={`${process.env.PUBLIC_URL}/assets/images/reserved-seat.svg`}
              alt="Reserved seat"
            />{' '}
            Плацкарт
          </button>
          <button
            className={`${styles['tab-btn']} ${activeTab === 'second' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('second')}
          >
            <img
              className={styles['tab-btn__icon']}
              src={`${process.env.PUBLIC_URL}/assets/images/compartment.svg`}
              alt="Compartment"
            />{' '}
            Купе
          </button>

          <button
            className={`${styles['tab-btn']} ${activeTab === 'first' ? styles['tab-btn_active'] : ''}`}
            onClick={() => setActiveTab('first')}
          >
            <img
              className={styles['tab-btn__icon']}
              src={`${process.env.PUBLIC_URL}/assets/images/star.svg`}
              alt="Luxury"
            />{' '}
            Люкс
          </button>
        </div>
      </section>
      {activeTab !== 'none' && existingTypes.length > 0 && (
        <div className={styles['seats-selection__wagon-selector']}>
          <div className={styles['wagon-selector__header']}>
            <div className={styles['wagon-selector__list']}>
              Вагоны{' '}
              {existingTypes.map((wagon) => (
                <button
                  key={wagon.coach._id}
                  className={`${styles['wagon-btn']} ${
                    activeWagons.some((w) => w.coach._id === wagon.coach._id)
                      ? styles['wagon-btn_active']
                      : ''
                  }`}
                  onClick={() => {
                    setActiveWagons((prev) =>
                      prev.some((w) => w.coach._id === wagon.coach._id)
                        ? prev.filter((w) => w.coach._id !== wagon.coach._id)
                        : [...prev, wagon]
                    );
                  }}
                >
                  {wagon.coach.name}
                </button>
              ))}
            </div>
            <span className={styles['wagon-selector__direction']}>
              Нумерация вагонов начинается с головы поезда
            </span>
          </div>
          {existingTypes
            .filter((wagon) =>
              activeWagons.some(
                (activeWagon) => activeWagon.coach._id === wagon.coach._id
              )
            )
            .map((wagon, index) => {
              const currentWagonSeatsNumbers = (
                selectedSeats[wagon.coach._id] || []
              ).map((seat) => seat.index);
              return (
                <>
                  <CoachCard
                    key={wagon.coach._id}
                    wagon={wagon}
                    index={index}
                    activeTab={activeTab}
                    wagonAmenities={activeAmenities[wagon.coach._id] || []}
                    onAddAmenity={(amenity) =>
                      handlerAddAmenity(wagon.coach._id, amenity)
                    }
                    wagonSeats={selectedSeats[wagon.coach._id] || []}
                    onSeatClick={(seatNumber) => {
                      handleSeatClick(wagon.coach._id, seatNumber);
                    }}
                  />
                  <CoachMap
                    activeTab={activeTab}
                    currentCoachData={wagon}
                    currentAmenities={activeAmenities[wagon.coach._id] || []}
                    destination={destination}
                    wagonSeats={selectedSeats[wagon.coach._id] || []}
                    onSeatClick={(seatNumber) =>
                      handleSeatClick(wagon.coach._id, seatNumber)
                    }
                  />
                </>
              );
            })}
        </div>
      )}
    </section>
  );
}
