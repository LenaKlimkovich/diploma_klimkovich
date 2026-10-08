import { useState, useEffect } from 'react';
import styles from './PassengerForm.module.css';

export interface Passenger {
  id: number;
  type: 'adult' | 'child';
  lastName: string;
  firstName: string;
  middleName: string;
  gender: 'M' | 'F';
  birthDate: string;
  isLimitedMobility: boolean;
  documentType: string;
  docSeries: string;
  docNumber: string;
  docError: string;
}

interface PassengerFormProps {
  onValidityChange: (isValid: boolean) => void;
}

export default function PassengerForm({
  onValidityChange,
}: PassengerFormProps) {
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: 1,
      type: 'adult',
      lastName: '',
      firstName: '',
      middleName: '',
      gender: 'M',
      birthDate: '',
      isLimitedMobility: false,
      documentType: 'Паспорт РФ',
      docSeries: '',
      docNumber: '',
      docError: '',
    },
  ]);

  const [activeSelectId, setActiveSelectId] = useState<number | null>(null);
  const [openTabs, setOpenTabs] = useState<number[]>([1]);

  const updatePassengerField = (
    id: number,
    field: keyof Passenger,
    value: any
  ) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleAddPassenger = () => {
    const newId =
      passengers.length > 0 ? Math.max(...passengers.map((p) => p.id)) + 1 : 1;
    const newPassenger: Passenger = {
      id: newId,
      type: 'adult',
      lastName: '',
      firstName: '',
      middleName: '',
      gender: 'M',
      birthDate: '',
      isLimitedMobility: false,
      documentType: 'Паспорт РФ',
      docSeries: '',
      docNumber: '',
      docError: '',
    };
    setPassengers((prev) => [...prev, newPassenger]);
    setOpenTabs((prev) => [...prev, newId]);
  };

  const handleRemovePassenger = (id: number) => {
    setPassengers((prev) => prev.filter((p) => p.id !== id));
    setOpenTabs((prev) => prev.filter((tabId) => tabId !== id));
  };

  const handleToggleInfo = (id: number) => {
    setOpenTabs((prev) =>
      prev.includes(id)
        ? prev.filter((activeId) => activeId !== id)
        : [...prev, id]
    );
  };

  const regExpPassport = /^\d{6}$/;
  const regExpBirth = /^[I-X]{1,4}-[А-ЯЁ]{2}-\d{6}$/;

  const isFormValid = passengers.every((p) => {
    const baseValid =
      p.lastName.trim() !== '' &&
      p.firstName.trim() !== '' &&
      p.birthDate.trim() !== '' &&
      p.docNumber.trim() !== '' &&
      !p.docError;

    if (p.type === 'adult') {
      return (
        baseValid &&
        p.docSeries &&
        p.docSeries.trim() !== '' &&
        p.docNumber.length === 6 &&
        /^\d+$/.test(p.docNumber)
      );
    }
    return baseValid && p.docNumber.length >= 12;
  });

  const isCardValid = (p: Passenger) => {
    const baseValid =
      p.lastName.trim() !== '' &&
      p.firstName.trim() !== '' &&
      p.birthDate.trim() !== '' &&
      p.docNumber.trim() !== '' &&
      !p.docError;

    if (p.type === 'adult') {
      return (
        baseValid &&
        p.docSeries &&
        p.docSeries.trim() !== '' &&
        p.docNumber.length === 6 &&
        /^\d+$/.test(p.docNumber)
      );
    }

    return baseValid && p.docNumber.length >= 12;
  };

  useEffect(() => {
    onValidityChange(isFormValid);
  }, [isFormValid, onValidityChange]);

  return (
    <div className={styles.passenger}>
      {passengers.map((passenger, index) => {
        const isCurrentTabOpen = openTabs.includes(passenger.id);

        const isCurrentCardValid = isCardValid(passenger);

        return (
          <div key={passenger.id} className={styles.passenger__card}>
            {/* Шапка карточки */}
            <div className={styles.passenger__header}>
              <h3 className={styles['passenger__header-title']}>
                <div
                  className={
                    isCurrentTabOpen
                      ? styles['passenger__icon-minus']
                      : styles['passenger__icon-plus']
                  }
                  onClick={() => handleToggleInfo(passenger.id)}
                  style={{ cursor: 'pointer', marginRight: '8px' }}
                >
                  {isCurrentTabOpen ? '–' : '+'}
                </div>
                Пассажир {index + 1}
              </h3>
              <button
                type="button"
                className={styles.passenger__btn_close}
                onClick={() => handleRemovePassenger(passenger.id)}
              >
                ×
              </button>
            </div>

            {isCurrentTabOpen && (
              <div className={styles.passenger__content}>
                <div className={styles.passenger__select_wrapper}>
                  <div
                    className={styles.passenger__select_trigger}
                    onClick={() =>
                      setActiveSelectId(
                        activeSelectId === passenger.id ? null : passenger.id
                      )
                    }
                  >
                    {passenger.type === 'adult' ? 'Взрослый' : 'Детский'}
                    <span className={styles.passenger__select_arrow}>▼</span>
                  </div>
                  {activeSelectId === passenger.id && (
                    <div className={styles.passenger__dropdown}>
                      <div
                        className={styles.passenger__dropdown_item}
                        onClick={() => {
                          updatePassengerField(passenger.id, 'type', 'child');
                          setActiveSelectId(null);
                        }}
                      >
                        Детский
                      </div>
                      <div
                        className={styles.passenger__dropdown_item}
                        onClick={() => {
                          updatePassengerField(passenger.id, 'type', 'adult');
                          setActiveSelectId(null);
                        }}
                      >
                        Взрослый
                      </div>
                    </div>
                  )}
                </div>

                {/* ФИО ряд */}
                <div className={styles.passenger__grid_three}>
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>Фамилия</label>
                    <input
                      type="text"
                      className={styles.passenger__input}
                      value={passenger.lastName}
                      onChange={(e) =>
                        updatePassengerField(
                          passenger.id,
                          'lastName',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>Имя</label>
                    <input
                      type="text"
                      className={styles.passenger__input}
                      value={passenger.firstName}
                      onChange={(e) =>
                        updatePassengerField(
                          passenger.id,
                          'firstName',
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>Отчество</label>
                    <input
                      type="text"
                      className={styles.passenger__input}
                      value={passenger.middleName}
                      onChange={(e) =>
                        updatePassengerField(
                          passenger.id,
                          'middleName',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Пол и Дата Рождения */}
                <div className={styles.passenger__grid_flex}>
                  <div className={styles.passenger__input_gender}>
                    <label className={styles.passenger__label}>Пол</label>
                    <div className={styles.passenger__gender_toggle}>
                      <button
                        type="button"
                        className={`${styles.passenger__gender_btn} ${passenger.gender === 'M' ? styles['passenger__gender_btn--active'] : ''}`}
                        onClick={() =>
                          updatePassengerField(passenger.id, 'gender', 'M')
                        }
                      >
                        М
                      </button>
                      <button
                        type="button"
                        className={`${styles.passenger__gender_btn} ${passenger.gender === 'F' ? styles['passenger__gender_btn--active'] : ''}`}
                        onClick={() =>
                          updatePassengerField(passenger.id, 'gender', 'F')
                        }
                      >
                        Ж
                      </button>
                    </div>
                  </div>

                  <div className={styles.passenger__input_birth}>
                    <label className={styles.passenger__label}>
                      Дата рождения
                    </label>
                    <input
                      type="text"
                      placeholder="ДД/ММ/ГГГГ"
                      className={styles.passenger__input_short}
                      value={passenger.birthDate}
                      onChange={(e) =>
                        updatePassengerField(
                          passenger.id,
                          'birthDate',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Чекбокс подвижности */}
                <label className={styles.passenger__checkbox_label}>
                  <input
                    type="checkbox"
                    checked={passenger.isLimitedMobility}
                    onChange={(e) =>
                      updatePassengerField(
                        passenger.id,
                        'isLimitedMobility',
                        e.target.checked
                      )
                    }
                    className={styles.passenger__checkbox}
                  />
                  ограниченная подвижность
                </label>

                {/* Документы */}
                <div
                  className={`${styles.passenger__grid_docs} ${
                    passenger.type === 'adult'
                      ? styles.passenger__grid_adult
                      : styles.passenger__grid_child
                  }`}
                >
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>
                      Тип документа
                    </label>
                    <div className={styles.passenger__select_trigger}>
                      {passenger.type === 'adult'
                        ? 'Паспорт РФ'
                        : 'Свидетельство о рождении'}
                    </div>
                  </div>
                  {passenger.type === 'adult' && (
                    <div className={styles.passenger__input_group}>
                      <label className={styles.passenger__label}>Серия</label>
                      <input
                        type="text"
                        placeholder="_ _ _ _"
                        className={styles.passenger__input}
                        maxLength={4}
                        value={passenger.docSeries}
                        onChange={(e) =>
                          updatePassengerField(
                            passenger.id,
                            'docSeries',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>Номер</label>
                    <div className={styles.passenger__input_wrapper}>
                      <input
                        type="text"
                        placeholder={
                          passenger.type === 'child' ? '' : '_ _ _ _ _ _'
                        }
                        className={`${styles.passenger__input} ${passenger.type}`}
                        value={passenger.docNumber}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (passenger.type === 'child') {
                            value = value.toUpperCase();
                          }
                          updatePassengerField(
                            passenger.id,
                            'docNumber',
                            value
                          );
                        }}
                        onKeyDown={(e) => {
                          if (
                            passenger.type === 'adult' &&
                            passenger.docNumber
                          ) {
                            if (
                              (e.key === 'Enter' &&
                                passenger.docNumber.length < 6) ||
                              passenger.docNumber.length > 5 ||
                              (e.key === 'Enter' &&
                                e.currentTarget.value.length === 6 &&
                                !regExpPassport.test(passenger.docNumber))
                            ) {
                              e.preventDefault();

                              updatePassengerField(
                                passenger.id,
                                'docError',
                                'Номер паспорта должен содержать 6 цифр'
                              );
                              updatePassengerField(
                                passenger.id,
                                'docNumber',
                                ''
                              );
                            }
                          }
                          if (
                            passenger.type === 'child' &&
                            passenger.docNumber
                          ) {
                            if (
                              (e.key === 'Enter' &&
                                passenger.docNumber.length < 12) ||
                              (e.key === 'Enter' &&
                                e.currentTarget.value.length === 12 &&
                                !regExpBirth.test(passenger.docNumber))
                            ) {
                              e.preventDefault();

                              updatePassengerField(
                                passenger.id,
                                'docError',
                                'Номер свидетельства о рождении указан некорректно Пример: VIII-ЫП-123456'
                              );
                            }
                          }
                        }}
                        onBlur={() => {
                          if (
                            passenger.type === 'adult' &&
                            passenger.docNumber
                          ) {
                            if (!regExpPassport.test(passenger.docNumber)) {
                              updatePassengerField(
                                passenger.id,
                                'docError',
                                'Номер паспорта должен содержать 6 цифр'
                              );
                              updatePassengerField(
                                passenger.id,
                                'docNumber',
                                ''
                              );
                            }
                          }
                          if (
                            passenger.type === 'child' &&
                            passenger.docNumber
                          ) {
                            if (!regExpBirth.test(passenger.docNumber)) {
                              updatePassengerField(
                                passenger.id,
                                'docError',
                                'Номер свидетельства о рождении указан некорректно Пример: VIII-ЫП-123456'
                              );
                              updatePassengerField(
                                passenger.id,
                                'docNumber',
                                ''
                              );
                            }
                          }
                        }}
                      />
                      {!passenger.docNumber && passenger.type === 'child' && (
                        <div className={styles.passenger__custom_placeholder}>
                          <span>12 символов</span>
                          <span className={styles.passenger__sub_text}>
                            _ _ _ _ _ _ _ _ _ _ _ _
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    isCurrentCardValid
                      ? styles.card__footer_valid
                      : styles.card__footer
                  }
                >
                  {isCurrentCardValid && (
                    <div className={styles.card__ready}>
                      <div className={styles.ready__img}></div>
                      <p>Готово</p>
                    </div>
                  )}
                  {passengers.some((p) => p.docError) ? (
                    <div className={styles.passenger__error_message}>
                      <div
                        className={styles.passenger__error_close}
                        onClick={() => {
                          updatePassengerField(passenger.id, 'docError', '');
                        }}
                      >
                        ✖
                      </div>
                      <p className={styles.passenger__error_text}>
                        {passenger.docError}
                      </p>
                      <div className={styles.passenger__error_example}></div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={
                        isCurrentCardValid
                          ? styles.passenger__next_valid
                          : styles.passenger__next
                      }
                    >
                      Следующий пассажир
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className={styles.passenger__add}
        onClick={handleAddPassenger}
      >
        Добавить пассажира
        <div className={styles.passenger__btn_add}>+</div>
      </button>
    </div>
  );
}
