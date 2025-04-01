import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/providers/authProviders'
import { auth } from '../../lib/auth'
// import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth Minimal App',
  description: 'A minimal app with NextAuth.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session!}>{children}</AuthProvider>
      </body>
    </html>
  )
}