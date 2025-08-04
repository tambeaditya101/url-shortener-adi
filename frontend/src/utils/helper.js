import { redirect } from '@tanstack/react-router';
import { getCurrentUser } from '../api/user.api';
import { login } from '../redux/store/slice/authSlice';

export const isAuthorized = async ({ context }) => {
  try {
    const { store } = context;

    const user = await getCurrentUser();
    // Update Redux state with fresh user data
    if (!user) return false;
    store.dispatch(login(user));

    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;
    return true;
  } catch (error) {
    console.log('Failed to get user', error);
    return redirect({
      to: '/auth',
    });
  }
};
