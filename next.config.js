/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL: "https://app.magnety.finance/"
  },
  typescript: {
    ignoreBuildErrors: true
  }


}

module.exports = nextConfig
