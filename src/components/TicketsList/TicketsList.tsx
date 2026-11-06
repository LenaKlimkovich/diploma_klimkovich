import { ReactElement } from 'react';
import TrainSorting from '../TrainSorting/TrainSorting';
import TrainTicket from '../TrainTicket/TrainTicket';
import Pagination from '../Pagination/Pagination';
import { useAppSelector } from '../../store/hooks';

export default function TicketsList(): ReactElement {
  const { error, items, isSearched } = useAppSelector((state) => state.routes);
  const ticketForm = useAppSelector((state) => state.routes);

  if (error) {
    return <p>Произошла ошибка при загрузке билетов</p>;
  }

  const filteredItems = ticketForm.items.filter((item) => {
    // Проверка фильтра: Время прибытия ТУДА (start_arrival)
    if (item.departure?.to?.datetime) {
      const dateTo = new Date(item.departure.to.datetime * 1000);
      const hourTo = dateTo.getUTCHours();
      
      const fromHour = ticketForm.start_arrival_hour_from ?? 0;
      const toHour = ticketForm.start_arrival_hour_to ?? 24;

      if (hourTo < fromHour || hourTo > toHour) {
        return false;
      }
    }

    // Проверка фильтра: Время отбытия ОБРАТНО (end_departure)
    if (item.arrival?.from?.datetime) {
      const dateBackFrom = new Date(item.arrival.from.datetime * 1000);
      const hourBackFrom = dateBackFrom.getUTCHours();

      const fromHour = ticketForm.end_departure_hour_from ?? 0;
      const toHour = ticketForm.end_departure_hour_to ?? 24;

      if (hourBackFrom < fromHour || hourBackFrom > toHour) {
        return false;
      }
    }

    // Проверка фильтра: Время прибытия ОБРАТНО (end_arrival)
    if (item.arrival?.to?.datetime) {
      const dateBackTo = new Date(item.arrival.to.datetime * 1000);
      const hourBackTo = dateBackTo.getUTCHours();

      const fromHour = ticketForm.end_arrival_hour_from ?? 0;
      const toHour = ticketForm.end_arrival_hour_to ?? 24;

      if (hourBackTo < fromHour || hourBackTo > toHour) {
        return false;
      }
    }

    return true; 
  });
  
  if (filteredItems.length === 0 && isSearched) {
    return (
      <p
        style={{
          fontSize: '20px',
          textAlign: 'center',
          marginTop: '40px',
          fontWeight: 500,
        }}
      >
        Билеты по Вашему запросу не найдены
      </p>
    );
  }

  return (
    <>
      {filteredItems.length > 0 && (
        <>
          <TrainSorting />
          {filteredItems.map((item, index) => (
            <TrainTicket key={item.departure?._id || index} route={item} />
          ))}
          <Pagination />
        </>
      )}
    </>
  );
}
