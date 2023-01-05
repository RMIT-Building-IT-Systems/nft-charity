/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAINNET_RPC_URL: process.env.MAINNET_RPC_URL,
    GOERLI_RPC_URL: process.env.GOERLI_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
  }
}

module.exports = nextConfig
