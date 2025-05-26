import type { NextConfig } from "next";

// @ts-ignore
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [ {
            protocol: "https",
            hostname: '*.vkuserphoto.ru'
        }],
    },
}

export default nextConfig;
