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
module.exports = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
