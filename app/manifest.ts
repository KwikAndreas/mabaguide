import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MabaGuide UBM',
    short_name: 'MabaGuide',
    description: 'Panduan Terpersonalisasi untuk Akselerasi Orientasi Akademik dan Birokrasi Kampus UBM',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/logo_ubm192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo_ubm512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
