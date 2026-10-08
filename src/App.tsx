import { Routes, Route } from 'react-router-dom';
import { TicketsPage } from './pages/TicketsPage/TicketsPage';
import { MainPage } from './pages/MainPage/MainPage';
import PassengerPage from './pages/PassengerPage/PassengerPage';
import TicketsList from './components/TicketsList/TicketsList';
import SeatsPage from './pages/SeatsPage/SeatsPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import CheckPage from './pages/CheckPage/CheckPage';
import ConfirmPage from './pages/ConfirmPage/ConfirmPage';
import { MainLayout } from './layouts/MainLayout/MainLayout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="tickets" element={<TicketsPage />}>
          <Route index element={<TicketsList />} />
          <Route path="seats" element={<SeatsPage />} />
          <Route path="passengers" element={<PassengerPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="check" element={<CheckPage />} />
        </Route>
        <Route path="confirm" element={<ConfirmPage />}></Route>
      </Route>
    </Routes>
  );
}
