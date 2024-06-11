/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
        unoptimized: true
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
