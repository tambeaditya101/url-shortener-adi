import { useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import UrlForm from '../components/UrlForm';
import UserUrls from '../components/UserUrls';
import { logout } from '../redux/store/slice/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/' });
  };

  return (
    <div className='max-w-xl mx-auto mt-20  p-8 glow-border shadow-lg'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Dashboard</h2>
          <p className='text-sm text-gray-600'>Welcome, {user?.name}!</p>
        </div>
        <button
          onClick={handleLogout}
          className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm'
        >
          Logout
        </button>
      </div>
      <UrlForm />
      <UserUrls />
    </div>
  );
}

export default Dashboard;
