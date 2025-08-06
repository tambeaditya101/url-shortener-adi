import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../api/user.api';
import { login } from '../redux/store/slice/authSlice';

function LoginForm({ setShowLoginForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      // Store token in localStorage
      if (data?.token) {
        localStorage.setItem('accessToken', data?.token);
      }

      console.log(data?.message);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
      // if login success, redirect to homepage

      // Handle successful login (redirect, store token, etc.)
    } catch (err) {
      console.log(err.message, '::adiii');
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-5 p-6 '>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 [text-shadow:1px_1px_2px_rgba(0,0,0,0.1)]'>
          Login
        </h2>
        <Link to='/' className='text-gray-500 hover:text-gray-700 text-sm'>
          ← Back to Home
        </Link>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div>
        <p className='text-center mt-4'>
          Don't have an account?{' '}
          <span
            onClick={() => setShowLoginForm(false)}
            className='text-blue-600 hover:underline cursor-pointer'
          >
            Sign Up
          </span>
        </p>
      </div>
      {error && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
          <p className='text-red-700'>{error}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
