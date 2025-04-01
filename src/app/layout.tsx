import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './providers'
// import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth Minimal App',
  description: 'A minimal app with NextAuth.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}