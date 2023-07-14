/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env:{
    API_Key:process.env.API_Key,
    auth_Domain:process.env.auth_Domain,
    projectId:process.env.projectId,
    storageBucket:process.env.storageBucket,
    messagingSenderId:process.env.messagingSenderId,
    appId:process.env.appId
  }
}

module.exports = nextConfig
