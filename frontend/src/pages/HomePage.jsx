import { Link } from '@tanstack/react-router';
import UrlForm from '../components/UrlForm';

function HomePage() {
  return (
    <div className='max-w-md mx-auto mt-20 p-8 glow-border shadow-lg'>
      <div className='flex justify-center items-center mb-6'>
        <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 [text-shadow:1px_1px_2px_rgba(0,0,0,0.1)]'>
          URL Shortener
        </h2>
      </div>
      <UrlForm />

      <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md'>
        <h3 className='font-semibold text-blue-800 mb-2'>
          Want more features?
        </h3>
        <p className='text-blue-700 text-sm mb-3'>
          Create an account to save your URLs, add custom urls, and track
          clicks!
        </p>
        <Link
          to='/auth'
          className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm'
        >
          Sign Up / Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
