/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
