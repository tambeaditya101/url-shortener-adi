const config = {
  API_BASE_URL: import.meta.env.PROD
    ? 'https://url-shortener-api-ppu3.onrender.com' // Replace with your actual Render URL
    : 'http://localhost:3000',
};

export default config;
