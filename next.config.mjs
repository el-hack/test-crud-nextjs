/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.vagueapp.com",
            },
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            }
        ],
    },
};

export default nextConfig;
