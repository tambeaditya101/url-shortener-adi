import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getUserUrls } from '../api/shortUrl.api';
import config from '../utils/config';

function UserUrls() {
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: urls = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrls,
  });

  const copyToClipboard = async (url, urlId) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(urlId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading)
    return <div className='text-center py-4'>Loading your URLs...</div>;

  if (error)
    return <div className='text-red-600 text-center py-4'>{error.message}</div>;

  if (urls.length === 0) {
    return (
      <div className='mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md text-center'>
        <p className='text-gray-600'>No URLs generated yet.</p>
        <p className='text-sm text-gray-500 mt-1'>
          Create your first short URL above!
        </p>
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4'>Your URLs</h3>
      {urls.length > 3 && (
        <span className='text-xs text-gray-500 text-right block mb-2 -mt-7'>
          Scroll to see more ↓
        </span>
      )}
      <div className='space-y-3 max-h-64 overflow-y-auto pr-2'>
        {urls.map((url) => (
          <div
            key={url._id}
            className='p-4 bg-gray-50 border border-gray-200 rounded-md'
          >
            <div className='flex justify-between items-start'>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {url.originalUrl}
                </p>
                <div className='flex items-center space-x-2.5 mt-1'>
                  <a
                    href={`${config.API_BASE_URL}/${url.shortUrl}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:text-blue-800 text-sm'
                  >
                    {`${config.API_BASE_URL}/${url.shortUrl}`}
                  </a>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${config.API_BASE_URL}/${url.shortUrl}`,
                        url._id
                      )
                    }
                    className={`cursor-pointer text-xs px-2 py-1 rounded transition-colors ${
                      copiedId === url._id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {copiedId === url._id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-xs text-gray-500'>{url.clicks} clicks</p>
                <p className='text-xs text-gray-400'>
                  {new Date(url.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserUrls;
