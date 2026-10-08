import { ReactElement } from 'react';
import TrainSorting from '../TrainSorting/TrainSorting';
import TrainTicket from '../TrainTicket/TrainTicket';
import Pagination from '../Pagination/Pagination';

export default function TicketsList(): ReactElement {
  return (
    <>
      <TrainSorting />
      <TrainTicket />
      <TrainTicket />
      <TrainTicket />
      <TrainTicket />
      <TrainTicket />
      <Pagination />
    </>
  );
}
