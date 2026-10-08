import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './TimeFilter.module.css';

// Функция для форматирования минут в строку "ЧЧ:ММ"
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

export default function TimeFilter({ title = 'Время отбытия' }) {
  const [timeRange, setTimeRange] = useState<number[]>([0, 1440]);

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
          value={timeRange}
          onChange={(value) => setTimeRange(value as number[])}
          allowCross={false}
          className={styles.custom__timeslider}
        />
      </div>

      <div className={styles.labels}>
        <span className={styles.timeLabel}>{formatTime(timeRange[0])}</span>
        <span className={styles.timeLabel}>{formatTime(timeRange[1])}</span>
        <span className={styles.timeLabel}>24:00</span>
      </div>
    </div>
  );
}
