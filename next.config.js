/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: `http://localhost:3000/`
  },
  typescript: {
    ignoreBuildErrors: true
  }


}

module.exports = nextConfig
