import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './TimeFilter.module.css';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setTimeRange } from '../../store/slices/routesSlice';
import { RoutesState } from '../../store/slices/routesSlice';

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

interface TimeFilterProps {
  title?: string;
  fieldName:
    'start_departure' | 'start_arrival' | 'end_departure' | 'end_arrival';
}
export default function TimeFilter({
  title = 'Время отбытия',
  fieldName,
}: TimeFilterProps) {
  const dispatch = useAppDispatch();

  const routes = useAppSelector((state) => state.routes);

  const fromHour =
    (routes[`${fieldName}_hour_from` as keyof RoutesState] as number) ?? 0;
  const toHour =
    (routes[`${fieldName}_hour_to` as keyof RoutesState] as number) ?? 24;

  const [localTime, setLocalTime] = useState<[number, number]>([
    fromHour * 60,
    toHour * 60,
  ]);

  useEffect(() => {
    setLocalTime([fromHour * 60, toHour * 60]);
  }, [fromHour, toHour]);

  const handleSliderTimeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setLocalTime(value as [number, number]);
    }
  };

  const handleSliderTimeAfterChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(
        setTimeRange({
          name: `${fieldName}_hour` as keyof RoutesState,
          range: value as [number, number],
        })
      );
    }
  };

  return (
    <div className={styles.filterContainer}>
      <h4
        className={
          title === 'Время отбытия'
            ? styles['title__to']
            : styles['title__back']
        }
      >
        {title}
      </h4>
      <div className={styles.slider__wrapper}>
        <Slider
          range
          min={0}
          max={1440}
          step={1}
          value={localTime}
          onChange={handleSliderTimeChange}
          onChangeComplete={handleSliderTimeAfterChange}
          allowCross={false}
          className={styles.custom__timeslider}
        />
      </div>
      <div className={styles.labels}>
        <span className={styles.timeLabel}>{formatTime(localTime[0])}</span>
        <span className={styles.timeLabel}>{formatTime(localTime[1])}</span>
      </div>
    </div>
  );
}
