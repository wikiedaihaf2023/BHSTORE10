import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'BH STORE | متجر بي إتش',
        short_name: 'BH STORE',
        description: 'The premium e-commerce platform for all your needs.',
        start_url: '/',
        display: 'standalone',
        background_color: '#131921',
        theme_color: '#FCD34D',
        icons: [
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
