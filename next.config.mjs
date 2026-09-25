/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/directory", destination: "/chapters", permanent: true },
      { source: "/newsletter", destination: "/magazine", permanent: true },
    ];
  },
};
export default nextConfig;
