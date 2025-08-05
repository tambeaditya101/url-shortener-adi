import { useMutation, useQueryClient } from '@tanstack/react-query';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createShortUrl } from '../api/shortUrl.api';

function UrlForm() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const queryClient = useQueryClient();

  const createUrlMutation = useMutation({
    mutationFn: ({ url, slug }) => createShortUrl(url, slug),
    onSuccess: (data) => {
      setShortUrl(data);
      setSlug('');

      // 🎉 Confetti blast!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'],
      });

      // Invalidate and refetch user URLs if authenticated
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ['userUrls'] });
      }
    },
    onError: (error) => {
      console.error('Error creating short URL:', error);
    },
  });
  const handleSubmit = async () => {
    createUrlMutation.mutate({
      url,
      slug: isAuthenticated ? slug : null,
    });
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
          placeholder='Enter URL e.g. https://www.google.com/'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        {isAuthenticated && (
          <input
            type='text'
            placeholder='Custom url (optional)'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        )}

        <button
          type='submit'
          onClick={handleSubmit}
          className='cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors'
        >
          Shorten URL
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
              className='text-blue-600 hover:text-blue-800 underline break-all cursor-pointer'
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
    </>
  );
}

export default UrlForm;
