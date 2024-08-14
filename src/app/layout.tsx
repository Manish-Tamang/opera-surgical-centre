import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { ToastContainer } from 'react-toastify'
import '@/styles/tailwind.css'
import { CartProvider } from '@/contexts/CartContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Opera Surgical Centre',
    default: 'Opera Surgical Centre',
  },
  description: 'Opera Surgical Centre',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased', inter.variable)}>
      <CartProvider>
        <body className="font-sans">
          <ToastContainer />
          {children}
        </body>
      </CartProvider>
    </html>
  )
}
