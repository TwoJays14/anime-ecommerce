/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'scontent.xx.fbcdn.net',
      'platform-lookaside.fbsbx.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'banner2.cleanpng.com',
    ],
    loader: 'default',
  },
};

module.exports = nextConfig;
