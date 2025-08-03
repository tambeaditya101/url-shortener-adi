import { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';

function UrlForm() {
  const [url, setUrl] = useState('https://www.google.com/');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = await createShortUrl(url);
    setShortUrl(data);
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <div className='space-y-4'>
        <input
          type='url'
          placeholder='Enter your URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        <button
          type='submit'
          onClick={handleSubmit}
          disabled={loading}
          className='cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors'
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </div>

      {shortUrl && (
        <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-md'>
          <p className='font-semibold text-green-800 mb-2'>Short URL:</p>
          <div className='flex items-center space-x-2 justify-between'>
            <a
              href={shortUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-800 underline break-all'
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className={`cursor-pointer px-2 py-1 text-sm rounded transition-colors ${
                copied
                  ? 'bg-green-100 text-green-700 hover:bg-green-300'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-300'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* {error && (
        <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-md'>
          <p className='text-red-700'>{error}</p>
        </div>
      )} */}
    </>
  );
}

export default UrlForm;
