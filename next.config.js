/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites(){
        return [
            {
                source: '/api/:path*',
                destination: 'https://localhost:7072/:path*'
            }
        ]
    }
}

module.exports = nextConfig
