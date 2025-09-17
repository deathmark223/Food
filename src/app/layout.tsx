import './globals.css'
import { Providers } from './providers'

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
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}