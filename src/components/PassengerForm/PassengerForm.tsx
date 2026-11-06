import { useState } from 'react';
import styles from './PassengerForm.module.css';

export interface Passenger {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: string;
  document_data: string;
}

interface FormPassenger extends Passenger {
  id: number;
  isLimitedMobility: boolean;
  docSeries: string;
  docNumber: string;
  docError: string;
}

interface PassengerFormProps {
  onValidityChange: (isValid: boolean) => void;
  onPassengersChange: (passengers: Passenger[]) => void;
}

const REGEXP_DIGITS = /^\d+$/;
const REGEXP_PASSPORT = /^\d{6}$/;
const REGEXP_BIRTH = /^[I-X]{1,4}-[А-ЯЁ]{2}-\d{6}$/i;

export default function PassengerForm({
  onValidityChange,
  onPassengersChange,
}: PassengerFormProps): React.ReactElement {
  const [passengers, setPassengers] = useState<FormPassenger[]>([
    {
      id: 1,
      is_adult: true,
      first_name: '',
      last_name: '',
      patronymic: '',
      gender: true,
      birthday: '',
      document_type: 'паспорт',
      document_data: '',
      isLimitedMobility: false,
      docSeries: '',
      docNumber: '',
      docError: '',
    },
  ]);

  const [activeSelectId, setActiveSelectId] = useState<number | null>(null);
  const [openTabs, setOpenTabs] = useState<number[]>([1]);

  const validatePassenger = (p: FormPassenger): boolean => {
    const baseValid =
      p.last_name.trim() !== '' &&
      p.first_name.trim() !== '' &&
      p.birthday.trim() !== '' &&
      p.document_data.trim() !== '';

    const cleanDoc = p.document_data.replace(/\s/g, '');

    if (p.is_adult) {
      return (
        baseValid && cleanDoc.length === 10 && REGEXP_DIGITS.test(cleanDoc)
      );
    }
    return baseValid && p.document_data.trim().length >= 14;
  };

  const syncWithParent = (currentPassengers: FormPassenger[]) => {
    const nextFormValid = currentPassengers.every(validatePassenger);
    onValidityChange(nextFormValid);

    const cleanData: Passenger[] = currentPassengers.map(
      ({ id, isLimitedMobility, docSeries, docNumber, docError, ...rest }) =>
        rest
    );
    onPassengersChange(cleanData);
  };

  const handleFieldChange = (
    id: number,
    field: keyof FormPassenger,
    value: any
  ) => {
    const nextPassengers = passengers.map((p) => {
      if (p.id !== id) return p;

      let updatedFields: Partial<FormPassenger> = { [field]: value };

      if (field === 'is_adult') {
        updatedFields = {
          is_adult: value,
          document_type: value ? 'паспорт' : 'свидетельство',
          docSeries: '',
          docNumber: '',
          document_data: '',
          docError: '',
        };
      }

      const currentPassenger = { ...p, ...updatedFields };

      if (
        field === 'docSeries' ||
        field === 'docNumber' ||
        field === 'is_adult'
      ) {
        currentPassenger.document_data = currentPassenger.is_adult
          ? `${currentPassenger.docSeries} ${currentPassenger.docNumber}`.trim()
          : currentPassenger.docNumber.trim();
      }

      return currentPassenger;
    });

    setPassengers(nextPassengers);
    syncWithParent(nextPassengers);
  };

  const handleAddPassenger = () => {
    const newId =
      passengers.length > 0 ? Math.max(...passengers.map((p) => p.id)) + 1 : 1;
    const newPassenger: FormPassenger = {
      id: newId,
      is_adult: true,
      first_name: '',
      last_name: '',
      patronymic: '',
      gender: true,
      birthday: '',
      document_type: 'паспорт',
      document_data: '',
      isLimitedMobility: false,
      docSeries: '',
      docNumber: '',
      docError: '',
    };

    const nextPassengers = [...passengers, newPassenger];
    setPassengers(nextPassengers);
    setOpenTabs((prev) => [...prev, newId]);
    syncWithParent(nextPassengers);
  };

  const handleRemovePassenger = (id: number) => {
    if (passengers.length <= 1) return;

    const nextPassengers = passengers.filter((p) => p.id !== id);
    setPassengers(nextPassengers);
    setOpenTabs((prev) => prev.filter((tabId) => tabId !== id));
    syncWithParent(nextPassengers);
  };

  const handleToggleInfo = (id: number) => {
    setOpenTabs((prev) =>
      prev.includes(id)
        ? prev.filter((activeId) => activeId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={styles.passenger}>
      {passengers.map((passenger, index) => {
        const isCurrentTabOpen = openTabs.includes(passenger.id);
        const isCurrentCardValid = validatePassenger(passenger);

        return (
          <div key={passenger.id} className={styles.passenger__card}>
            <div className={styles.passenger__header}>
              <h3 className={styles['passenger__header-title']}>
                <div
                  className={
                    isCurrentTabOpen
                      ? styles['passenger__icon-minus']
                      : styles['passenger__icon-plus']
                  }
                  onClick={() => handleToggleInfo(passenger.id)}
                  style={{
                    cursor: 'pointer',
                    marginRight: '8px',
                    userSelect: 'none',
                  }}
                >
                  {isCurrentTabOpen ? '–' : '+'}
                </div>
                Пассажир {index + 1}
              </h3>
              {passengers.length > 1 && (
                <button
                  type="button"
                  className={styles.passenger__btn_close}
                  onClick={() => handleRemovePassenger(passenger.id)}
                >
                  ×
                </button>
              )}
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
                    {passenger.is_adult ? 'Взрослый' : 'Детский'}
                    <span className={styles.passenger__select_arrow}>▼</span>
                  </div>
                  {activeSelectId === passenger.id && (
                    <div className={styles.passenger__dropdown}>
                      <div
                        className={styles.passenger__dropdown_item}
                        onClick={() => {
                          handleFieldChange(passenger.id, 'is_adult', false);
                          setActiveSelectId(null);
                        }}
                      >
                        Детский
                      </div>
                      <div
                        className={styles.passenger__dropdown_item}
                        onClick={() => {
                          handleFieldChange(passenger.id, 'is_adult', true);
                          setActiveSelectId(null);
                        }}
                      >
                        Взрослый
                      </div>
                    </div>
                  )}
                </div>

                {/* Ряд ФИО */}
                <div className={styles.passenger__grid_three}>
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>Фамилия</label>
                    <input
                      type="text"
                      className={styles.passenger__input}
                      value={passenger.last_name}
                      onChange={(e) =>
                        handleFieldChange(
                          passenger.id,
                          'last_name',
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
                      value={passenger.first_name}
                      onChange={(e) =>
                        handleFieldChange(
                          passenger.id,
                          'first_name',
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
                      value={passenger.patronymic}
                      onChange={(e) =>
                        handleFieldChange(
                          passenger.id,
                          'patronymic',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {/* Пол и Дата Рождения */}
                <div className={styles.passenger__grid_flex}>
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>Пол</label>
                    <div className={styles.passenger__gender_toggle}>
                      <button
                        type="button"
                        className={`${styles.passenger__gender_btn} ${passenger.gender ? styles['passenger__gender_btn--active'] : ''}`}
                        onClick={() =>
                          handleFieldChange(passenger.id, 'gender', true)
                        }
                      >
                        М
                      </button>
                      <button
                        type="button"
                        className={`${styles.passenger__gender_btn} ${!passenger.gender ? styles['passenger__gender_btn--active'] : ''}`}
                        onClick={() =>
                          handleFieldChange(passenger.id, 'gender', false)
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
                      type="date"
                      placeholder="ДД/ММ/ГГ"
                      className={styles.passenger__input_short}
                      value={passenger.birthday}
                      onChange={(e) =>
                        handleFieldChange(
                          passenger.id,
                          'birthday',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <label className={styles.passenger__checkbox_label}>
                  <input
                    type="checkbox"
                    checked={passenger.isLimitedMobility}
                    onChange={(e) =>
                      handleFieldChange(
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
                    passenger.is_adult
                      ? styles.passenger__grid_adult
                      : styles.passenger__grid_child
                  }`}
                >
                  <div className={styles.passenger__input_group}>
                    <label className={styles.passenger__label}>
                      Тип документа
                    </label>
                    <div className={styles.passenger__select_trigger}>
                      {passenger.is_adult
                        ? 'Паспорт РФ'
                        : 'Свидетельство о рождении'}
                    </div>
                  </div>

                  {passenger.is_adult && (
                    <div className={styles.passenger__input_group}>
                      <label className={styles.passenger__label}>Серия</label>
                      <input
                        type="text"
                        placeholder="_ _ _ _"
                        className={styles.passenger__input}
                        maxLength={4}
                        value={passenger.docSeries}
                        onChange={(e) =>
                          handleFieldChange(
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
                        placeholder={passenger.is_adult ? '_ _ _ _ _ _' : ''}
                        className={`${styles.passenger__input} ${passenger.is_adult ? styles.passenger__input_adult : ''}`}
                        value={passenger.docNumber}
                        maxLength={passenger.is_adult ? 6 : 14}
                        onChange={(e) => {
                          const value = e.target.value;

                          handleFieldChange(passenger.id, 'docNumber', value);

                          if (
                            passenger.is_adult &&
                            value.length === 6 &&
                            REGEXP_PASSPORT.test(value) === false
                          ) {
                            handleFieldChange(
                              passenger.id,
                              'docError',
                              'Номер паспорта должен содержать 6 цифр'
                            );
                          }
                          if (
                            !passenger.is_adult &&
                            value.length === 14 &&
                            REGEXP_BIRTH.test(value) === false
                          ) {
                            handleFieldChange(
                              passenger.id,
                              'docError',
                              'Номер свидетельства о рождении указан некорректно. Пример: VIII-ЫП-123456'
                            );
                          }
                        }}
                      />
                      {!passenger.docNumber && !passenger.is_adult && (
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
                  className={`${styles.card__footer} ${isCurrentCardValid ? styles.card__footer_valid : ''}`}
                >
                  {isCurrentCardValid && (
                    <div className={styles.card__ready}>
                      <div className={styles.ready__img}></div>
                      <p>Готово</p>
                    </div>
                  )}
                  {passenger.docError !== '' && (
                    <div className={styles.passenger__error_message}>
                      <div
                        className={styles.passenger__error_close}
                        onClick={() => {
                          handleFieldChange(passenger.id, 'docError', '');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        ✖
                      </div>
                      <p className={styles.passenger__error_text}>
                        {passenger.docError}
                      </p>
                      <div className={styles.passenger__error_example}></div>
                    </div>
                  )}
                  {(isCurrentCardValid || passenger.docError === '') && (
                    <button
                      type="button"
                      className={
                        isCurrentCardValid
                          ? styles.passenger__next_valid
                          : styles.passenger__next
                      }
                      onClick={() => {
                        if (isCurrentCardValid) {
                          handleToggleInfo(passenger.id);
                        }
                      }}
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
