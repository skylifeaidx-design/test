/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow external images if needed, mostly for restaurant thumbnails locally or placeholder
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            }
        ]
    }
};

export default nextConfig;
