/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a check build use its own folder (NEXT_DIST_DIR=.next-verify) so it never clashes with a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      { source: "/directory", destination: "/chapters", permanent: true },
      { source: "/newsletter", destination: "/magazine", permanent: true },
    ];
  },
};
export default nextConfig;
