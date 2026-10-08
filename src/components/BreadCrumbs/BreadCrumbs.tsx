import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BreadCrumbs.module.css';
import { useLocation } from 'react-router-dom';

interface Step {
  id: number;
  name: string;
  path: string;
}

const Steps: Step[] = [
  { id: 1, name: 'Билеты', path: 'tickets' },
  { id: 2, name: 'Пассажиры', path: 'passengers' },
  { id: 3, name: 'Оплата', path: 'payment' },
  { id: 4, name: 'Проверка', path: 'check' },
];

export default function BreadCrumbs(): React.ReactElement {
  const location = useLocation();
  let page = location.pathname.split('/').filter(Boolean).pop();

  if (page === 'seats') {
    page = 'tickets';
  }

  const activeStepIndex = Steps.findIndex((s) => s.path === page);

  return (
    <section className={styles['order-steps']}>
      {Steps.map((step, index) => {
        const isActive = page === step.path;
        const isPast = activeStepIndex !== -1 && index < activeStepIndex;

        const stepClassName = `
          ${styles['step']} 
          ${isActive ? styles['step-active'] : ''} 
          ${isPast ? styles['step-past'] : ''}
        `.trim();

        return (
          <React.Fragment key={step.id}>
            <div className={stepClassName}>
              <div className={styles['step__number']}>{step.id}</div>
              <div className={styles['step__name']}>{step.name}</div>
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
}
