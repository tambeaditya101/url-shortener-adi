import UrlForm from '../components/UrlForm';

function HomePage() {
  return (
    <div className='max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
        URL Shortener
      </h2>
      <UrlForm />
    </div>
  );
}

export default HomePage;
