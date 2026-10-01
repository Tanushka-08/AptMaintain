import { useNavigate } from 'react-router-dom';
import RaiseTicket from '../components/RaiseTicket.jsx';

export default function RaiseTicketPage() {
  const navigate = useNavigate();
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <RaiseTicket onCreated={() => navigate('/tickets')} />
      </div>
    </div>
  );
}
