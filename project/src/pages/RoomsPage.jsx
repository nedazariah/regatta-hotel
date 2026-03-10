import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import theme from '../styles/theme';
import RoomCard from '../components/sections/RoomCard';
import RoomsSection from '../components/sections/RoomsSection';
import { ROOMS } from '../data/rooms';
import useWindowSize from '../hooks/useWindowSize';


export default function RoomsPage() {
  const { isMobile } = useWindowSize();
  const navigate      = useNavigate();
  const { updateBooking } = useBooking();

  const handleViewDetails = (room) => {
    updateBooking({ selectedRoom: room });
    navigate('/booking', { state: { openRoom: room.id } });
  };

  const handleReserve = (room) => {
    updateBooking({ selectedRoom: room });
    navigate('/booking', { state: { openRoom: room.id } });
  };

  return (
    <main style={{ background: theme.colors.cream }}>
      <RoomsSection />
    </main>
  );
}
