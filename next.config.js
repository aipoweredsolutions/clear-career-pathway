/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'rbaazdlxbevymvpxtazc.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
    },
    experimental: {
        reactCompiler: false,
        serverActions: {
            bodySizeLimit: '10mb',
        },
        optimizePackageImports: [
            'lucide-react',
            'framer-motion',
            'date-fns',
            '@react-pdf/renderer',
            'sonner',
        ],
    },
}

module.exports = nextConfig

