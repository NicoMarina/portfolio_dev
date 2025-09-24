/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/", 
        destination: "/under-construction",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
