import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/context/ThemeContext'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SheSync - Women\'s Health & Wellness Platform',
  description: 'Comprehensive women\'s health and wellness platform with AI-powered insights, period tracking, and community support.',
  keywords: ['women\'s health', 'period tracking', 'healthcare', 'wellness', 'AI'],
  authors: [{ name: 'Team WEB PIONEERS' }],
  openGraph: {
    title: 'SheSync - Women\'s Health & Wellness Platform',
    description: 'Empowering women with comprehensive health tracking and AI-powered insights.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SheSync - Women\'s Health & Wellness Platform',
    description: 'Empowering women with comprehensive health tracking and AI-powered insights.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <ErrorBoundary>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </ErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  )
}