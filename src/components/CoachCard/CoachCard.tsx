import styles from './CoachCard.module.css';
import { WagonData } from '../../store/slices/seatsSlice';
import { AmenityType } from '../SeatsSelection/Selection';
import { SelectedSeat } from '../SeatsSelection/Selection';

interface WagonCardProps {
  wagon: WagonData;
  activeTab: 'none' | 'first' | 'second' | 'third' | 'fourth';
  wagonAmenities: Exclude<AmenityType, 'none'>[];
  onAddAmenity: (amenity: Exclude<AmenityType, 'none'>) => void;
  wagonSeats: SelectedSeat[];
  onSeatClick: (seatNumber: number) => void;
  index: number;
}

export const CoachCard: React.FC<WagonCardProps> = ({
  wagon,
  activeTab,
  wagonAmenities,
  onAddAmenity,
  wagonSeats,
  onSeatClick,
  index,
}) => {
  return (
    <div
      key={wagon.coach._id}
      className={`${styles['wagon-detail']} ${index === 0 ? styles['wagon-detail_first'] : ''}`}
    >
      <div className={styles['wagon-detail__number-block']}>
        <div className={styles['wagon-detail__huge-number']}>
          {wagon.coach.name}
        </div>
        <div className={styles['wagon-detail__label']}>вагон</div>
      </div>

      <div className={styles['wagon-detail__info-grid']}>
        <div className={styles['wagon-detail__seats-info']}>
          <div className={styles['wagon-detail__info-column']}>
            <span className={styles['wagon-detail__seats-number']}>
              Места <span>{wagon.coach.available_seats}</span>
            </span>
            {wagon.coach.class_type !== 'first' ? (
              <>
                {wagon.coach.top_price !== 0 && (
                  <span className={styles['wagon-detail__seats']}>Верхние</span>
                )}
                {wagon.coach.bottom_price !== 0 && (
                  <span className={styles['wagon-detail__seats']}>Нижние</span>
                )}
                {wagon.coach.side_price !== 0 && (
                  <span className={styles['wagon-detail__seats']}>Боковые</span>
                )}
              </>
            ) : null}
          </div>
          <div className={styles['wagon-detail__info-column']}>
            <span className={styles['wagon-detail__price']}>Стоимость</span>
            {wagon.coach.class_type !== 'first' ? (
              <>
                <span className={styles['wagon-detail__sum']}>
                  <strong>{wagon.coach.top_price}</strong> ₽
                </span>
                <span className={styles['wagon-detail__sum']}>
                  <strong>{wagon.coach.bottom_price}</strong> ₽
                </span>
                {wagon.coach.side_price !== 0 && (
                  <span className={styles['wagon-detail__sum']}>
                    <strong>{wagon.coach.side_price}</strong> ₽
                  </span>
                )}
              </>
            ) : (
              <span className={styles['wagon-detail__sum']}>
                <strong>{wagon.coach.price}</strong> ₽
              </span>
            )}
          </div>
        </div>

        <div className={styles['wagon-detail__amenities']}>
          <div className={styles['amenities-title']}>
            <span className={styles['amenities-services']}>Обслуживание</span>
            <span className={styles['amenities-fpk']}>ФПК</span>
          </div>
          <div className={styles['amenities']}>
            {wagon.coach.have_air_conditioning && (
              <button
                className={`
  ${styles['amenity']} 
  ${styles['air-conditioning']} 
  ${wagonAmenities.includes('air-conditioning') ? styles['amenity_active'] : ''}
`}
                onClick={() => onAddAmenity('air-conditioning')}
                data-title="Кондиционер"
              ></button>
            )}
            {wagon.coach.have_wifi && (
              <button
                className={`${styles['amenity']} ${styles['wifi']} ${wagonAmenities.includes('wifi') ? styles['amenity_active'] : ''}`}
                onClick={() => onAddAmenity('wifi')}
                data-title="Wi-fi"
              ></button>
            )}
            {wagon.coach.is_linens_included === false ? (
              <button
                className={`${styles['amenity']} ${styles['bedding']} ${wagonAmenities.includes('linens') ? styles['amenity_active'] : ''}`}
                onClick={() => onAddAmenity('linens')}
                data-title="Постельное белье"
              ></button>
            ) : (
              <button
                className={`${styles['amenity']} ${styles['bedding']} `}

                data-title="Постельное белье"
                disabled
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
