import styles from './CoachMap.module.css';
import { useState, useEffect } from 'react';
import { Seat, WagonData } from '../../store/slices/seatsSlice';
import { AmenityType } from '../SeatsSelection/Selection';
import { SelectedSeat } from '../SeatsSelection/Selection';

const maps = {
  first: [
    // Купе 1
    { number: 1, x: 123, y: 20 },

    // Купе 2
    { number: 3, x: 181, y: 20 },
    { number: 4, x: 206, y: 20 },

    // Купе 3
    { number: 5, x: 263, y: 20 },
    { number: 6, x: 289, y: 20 },

    // Купе 4
    { number: 7, x: 345, y: 20 },
    { number: 8, x: 371, y: 20 },

    // Купе 5
    { number: 9, x: 427, y: 20 },
    { number: 10, x: 453, y: 20 },

    // Купе 6
    { number: 11, x: 510, y: 20 },
    { number: 12, x: 537, y: 20 },

    // Купе 7
    { number: 13, x: 593, y: 20 },
    { number: 14, x: 618, y: 20 },

    // Купе 8
    { number: 15, x: 675, y: 20 },
    { number: 16, x: 700, y: 20 },

    { number: 18, x: 758, y: 20 },
  ],
  second: [
    // Купе 1
    { number: 1, x: 123, y: 46 },
    { number: 2, x: 123, y: 19 },
    { number: 3, x: 180, y: 46 },
    { number: 4, x: 180, y: 19 },

    // Купе 2
    { number: 5, x: 206, y: 46 },
    { number: 6, x: 206, y: 19 },
    { number: 7, x: 262, y: 46 },
    { number: 8, x: 262, y: 19 },

    // Купе 3
    { number: 9, x: 288, y: 46 },
    { number: 10, x: 288, y: 19 },
    { number: 11, x: 345, y: 46 },
    { number: 12, x: 345, y: 19 },

    { number: 13, x: 371, y: 46 },
    { number: 14, x: 371, y: 19 },
    { number: 15, x: 426, y: 46 },
    { number: 16, x: 426, y: 19 },

    { number: 17, x: 453, y: 46 },
    { number: 18, x: 453, y: 19 },
    { number: 19, x: 509, y: 46 },
    { number: 20, x: 509, y: 19 },

    { number: 21, x: 535, y: 46 },
    { number: 22, x: 535, y: 19 },
    { number: 23, x: 592, y: 46 },
    { number: 24, x: 592, y: 19 },

    // --- Купе 6 ---
    { number: 25, x: 618, y: 46 },
    { number: 26, x: 618, y: 19 },
    { number: 27, x: 674, y: 46 },
    { number: 28, x: 674, y: 19 },

    // --- Купе 7 ---
    { number: 29, x: 701, y: 46 },
    { number: 30, x: 701, y: 19 },
    { number: 31, x: 757, y: 46 },
    { number: 32, x: 757, y: 19 },
  ],
  third: [
    // --- Купе 1 ---
    { number: 1, x: 123, y: 49 },
    { number: 2, x: 123, y: 20 },
    { number: 3, x: 179, y: 49 },
    { number: 4, x: 179, y: 20 },
    { number: 5, x: 206, y: 49 },
    { number: 6, x: 206, y: 20 },
    // --- Купе 2 ---
    { number: 7, x: 263, y: 49 },
    { number: 8, x: 263, y: 20 },
    { number: 9, x: 289, y: 49 },
    { number: 10, x: 289, y: 20 },

    // --- Купе 3 ---
    { number: 11, x: 345, y: 49 },
    { number: 12, x: 345, y: 20 },
    { number: 13, x: 373, y: 49 },
    { number: 14, x: 373, y: 20 },

    // --- Купе 4 ---
    { number: 15, x: 427, y: 49 },
    { number: 16, x: 427, y: 20 },
    { number: 17, x: 454, y: 49 },
    { number: 18, x: 454, y: 20 },

    // --- Купе 5 ---
    { number: 19, x: 511, y: 49 },
    { number: 20, x: 511, y: 20 },
    { number: 21, x: 538, y: 49 },
    { number: 22, x: 538, y: 20 },

    // --- Купе 6 ---
    { number: 23, x: 592, y: 49 },
    { number: 24, x: 592, y: 20 },
    { number: 25, x: 618, y: 49 },
    { number: 26, x: 618, y: 20 },

    // --- Купе 7 ---
    { number: 27, x: 675, y: 49 },
    { number: 28, x: 675, y: 20 },
    { number: 29, x: 702, y: 49 },
    { number: 30, x: 702, y: 20 },

    { number: 31, x: 756, y: 49 },
    { number: 32, x: 756, y: 20 },

    { number: 33, x: 123, y: 98, isSide: true },
    { number: 34, x: 160, y: 98, isSide: true },

    { number: 35, x: 205, y: 98, isSide: true },
    { number: 36, x: 242, y: 98, isSide: true },

    // --- Напротив Купе 5 ---
    { number: 37, x: 287, y: 98, isSide: true },
    { number: 38, x: 324, y: 98, isSide: true },

    // --- Напротив Купе 4 ---
    { number: 39, x: 369, y: 98, isSide: true },
    { number: 40, x: 406, y: 98, isSide: true },

    // --- Напротив Купе 3 ---
    { number: 41, x: 451, y: 98, isSide: true },
    { number: 42, x: 488, y: 98, isSide: true },

    // --- Напротив Купе 2 ---
    { number: 43, x: 533, y: 98, isSide: true },
    { number: 44, x: 570, y: 98, isSide: true },

    // --- Напротив Купе 1 ---
    { number: 45, x: 615, y: 98, isSide: true },
    { number: 46, x: 652, y: 98, isSide: true },

    // --- Самые первые боковые у туалета/проводника ---
    { number: 47, x: 697, y: 98, isSide: true },
    { number: 48, x: 734, y: 98, isSide: true },

    // --- Купе 2 ---
  ],

  fourth: [
    // Ряд 1
    { number: 2, x: 134, y: 20 },
    { number: 4, x: 176, y: 20 },
    { number: 1, x: 134, y: 43 },
    { number: 3, x: 176, y: 43 },
    { number: 34, x: 176, y: 79 },
    { number: 33, x: 134, y: 99 },
    { number: 35, x: 176, y: 99 },

    // Ряд 2
    { number: 5, x: 216, y: 43 },
    { number: 6, x: 216, y: 20 },
    { number: 7, x: 256, y: 43 },
    { number: 8, x: 256, y: 20 },
    { number: 36, x: 217, y: 79 },
    { number: 38, x: 254, y: 79 },
    { number: 37, x: 217, y: 99 },
    { number: 39, x: 254, y: 99 },

    // Ряд 3 (Одиночные кресла у перегородки)
    { number: 10, x: 297, y: 20 },
    { number: 9, x: 297, y: 43 },
    { number: 40, x: 296, y: 79 },
    { number: 41, x: 296, y: 99 },

    // Ряд 4
    { number: 12, x: 338, y: 20 },
    { number: 14, x: 378, y: 20 },
    { number: 11, x: 338, y: 43 },
    { number: 13, x: 378, y: 43 },
    { number: 42, x: 337, y: 79 },
    { number: 44, x: 379, y: 79 },
    { number: 43, x: 337, y: 99 },
    { number: 45, x: 379, y: 99 },

    // Ряд 5
    { number: 16, x: 418, y: 20 },
    { number: 18, x: 458, y: 20 },
    { number: 15, x: 418, y: 43 },
    { number: 17, x: 458, y: 43 },
    { number: 46, x: 418, y: 79 },
    { number: 48, x: 458, y: 79 },
    { number: 47, x: 418, y: 99 },
    { number: 49, x: 458, y: 99 },

    // Ряд 6 (Одиночные кресла по центру вагона)
    { number: 20, x: 498, y: 20 },
    { number: 19, x: 498, y: 43 },
    { number: 50, x: 498, y: 79 },
    { number: 51, x: 498, y: 99 },

    // Ряд 7
    { number: 22, x: 540, y: 20 },
    { number: 24, x: 580, y: 20 },
    { number: 23, x: 580, y: 43 },
    { number: 21, x: 540, y: 43 },
    { number: 52, x: 540, y: 79 },
    { number: 54, x: 580, y: 79 },
    { number: 53, x: 540, y: 99 },
    { number: 55, x: 580, y: 99 },

    // Ряд 8 (Одиночные кресла)
    { number: 26, x: 620, y: 20 },
    { number: 25, x: 620, y: 43 },
    { number: 56, x: 620, y: 79 },
    { number: 57, x: 620, y: 99 },

    // Ряд 9
    { number: 28, x: 660, y: 20 },
    { number: 30, x: 700, y: 20 },
    { number: 27, x: 660, y: 43 },
    { number: 29, x: 700, y: 43 },
    { number: 58, x: 660, y: 79 },
    { number: 60, x: 700, y: 79 },
    { number: 59, x: 660, y: 99 },
    { number: 61, x: 700, y: 99 },

    // Ряд 10 (Последние кресла)
    { number: 32, x: 740, y: 20 },
    { number: 31, x: 740, y: 43 },
    { number: 62, x: 740, y: 99 },
  ],
};

interface CoachMapProps {
  activeTab: 'first' | 'second' | 'third' | 'fourth';
  currentCoachData: WagonData;
  currentAmenities: Exclude<AmenityType, 'none'>[];
  destination: 'departure' | 'arrival';
  wagonSeats: SelectedSeat[];
  onSeatClick: (seatNumber: number) => void;
}

export default function CoachMap({
  activeTab,
  currentCoachData,
  currentAmenities,
  wagonSeats,
  onSeatClick,
}: CoachMapProps) {
  const [seats, setSeats] = useState<Seat[]>([]);

  // Синхронизируем локальные места с данными вагона
  useEffect(() => {
    if (!currentCoachData) return;
    setSeats(currentCoachData.seats);
  }, [currentCoachData]);

  const currentLayout = maps[activeTab];

  const getImagePath = () => {
    if (activeTab === 'second')
      return `${process.env.PUBLIC_URL}/assets/images/compartment-plan.svg`;
    if (activeTab === 'third')
      return `${process.env.PUBLIC_URL}/assets/images/reserved-plan.svg`;
    if (activeTab === 'fourth')
      return `${process.env.PUBLIC_URL}/assets/images/sitting-plan.png`;
    return `${process.env.PUBLIC_URL}/assets/images/luxury-plan.png`;
  };

  const getSeatDimensions = (seatConfig: any) => {
    if (activeTab === 'fourth') return { width: 25, height: 20 };
    if (activeTab === 'first') return { width: 23, height: 53 };
    if (seatConfig.isSide) return { width: 43, height: 21 };
    return { width: 24, height: 27 };
  };

  const reservedSeatsNumber = () => {
    if (!currentCoachData?.coach) return 0;
    if (activeTab === 'first')
      return 18 - currentCoachData.coach.available_seats;
    if (activeTab === 'second')
      return 32 - currentCoachData.coach.available_seats;
    if (activeTab === 'third')
      return 48 - currentCoachData.coach.available_seats;
    return 62 - currentCoachData.coach.available_seats;
  };

  const calculateThisWagonPrice = () => {
    if (!currentCoachData?.coach) return 0;
    const { coach } = currentCoachData;

    const getSeatPrice = (index: number) => {
      const { top_price, bottom_price, side_price, price } = coach;
      const isEven = index % 2 === 0;

      if (activeTab === 'first') return price || bottom_price || 0;

      if (index <= 32 && (activeTab === 'second' || activeTab === 'third')) {
        return isEven ? top_price : bottom_price;
      }
      if (activeTab === 'third' && index >= 33 && index <= 48) {
        return side_price;
      }
      if (activeTab === 'fourth' && index >= 1 && index <= 62) {
        return isEven ? top_price : bottom_price;
      }
      return bottom_price || 0;
    };

    const seatsCost = wagonSeats.reduce((sum, seat) => {
      let seatPrice = getSeatPrice(seat.index);
      if (seat.seatType === 'child') {
        seatPrice = Math.round(seatPrice * 0.5);
      }
      return sum + seatPrice;
    }, 0);

    const amenitiesCost = currentAmenities.reduce((sum, amenity) => {
      const priceKey = `${amenity}_price`;
      const costPerPerson = (coach as any)[priceKey] || 0;
      return sum + costPerPerson * wagonSeats.length;
    }, 0);

    return seatsCost + amenitiesCost;
  };

  return (
    <div className={styles['wagon-map']}>
      <span className={styles['wagon-add-info']}>
        {reservedSeatsNumber()} человек выбирают
        <br /> места в этом поезде
      </span>
      <div style={{ position: 'relative', width: '100%', maxWidth: '850px' }}>
        <img
          src={getImagePath()}
          alt="Train plan"
          style={{ width: '100%', display: 'block' }}
        />

        <svg
          viewBox="0 0 850 120"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          {currentLayout?.map((seat) => {
            const apiSeat = Array.isArray(seats)
              ? seats.find((s) => Number(s.index) === Number(seat.number))
              : undefined;

            const isAvailable = apiSeat ? apiSeat.available === true : false;

            const isSelected = wagonSeats.some((s) => s.index === seat.number);

            const { width, height } = getSeatDimensions(seat);
            let fill = '#FFFFFF';
            if (!isAvailable) fill = 'rgba(196, 196, 196, 1)';
            if (isSelected) fill = '#FFA500';

            return (
              <g
                key={seat.number}
                onClick={() => isAvailable && onSeatClick(seat.number)}
                style={{ cursor: !isAvailable ? 'not-allowed' : 'pointer' }}
              >
                <rect
                  x={seat.x}
                  y={seat.y}
                  width={width}
                  height={height}
                  rx="4"
                  fill={fill}
                  stroke={isSelected ? '#FFA500' : '#BDC3C7'}
                  strokeWidth={isSelected ? '2' : '1'}
                  style={{ transition: 'fill 0.15s ease' }}
                />
                <text
                  x={seat.x + width / 2}
                  y={seat.y + height - 6}
                  textAnchor="middle"
                  fill={!isAvailable ? '#FFFFFF' : '#000000'}
                  style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {seat.number}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {wagonSeats.length > 0 && (
        <div className={styles['ticket-price']}>
          <>
            {calculateThisWagonPrice()}
            <span> ₽</span>
          </>
        </div>
      )}
    </div>
  );
}
