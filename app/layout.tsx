import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../context/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SheSync - Your Journey to Confident Cycles',
  description: 'Empowering Women One Cycle at a Time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: "bg-pink-600 hover:bg-pink-700 text-sm",
          card: "bg-white dark:bg-gray-800",
          headerTitle: "text-gray-900 dark:text-white",
          headerSubtitle: "text-gray-600 dark:text-gray-400",
          formFieldLabel: "text-gray-700 dark:text-gray-300",
          formFieldInput: "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
          footerActionLink: "text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}