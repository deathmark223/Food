import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-arabic'
})

export const metadata = {
  title: 'Carthago Food - Food Delivery in Moulares, Gafsa',
  description: 'Order delicious food from local restaurants in Moulares, Gafsa, Tunisia. Fast delivery, fresh ingredients.',
  keywords: 'food delivery, Moulares, Gafsa, Tunisia, restaurant, order online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansArabic.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}