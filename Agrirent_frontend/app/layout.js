'use client'

import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "./providers"
import { useEffect, useState } from 'react'

// Font definitions are outside of component since they're configuration
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Handle extension attributes
    if (typeof window !== 'undefined' && document.documentElement.attributes) {
      Array.from(document.documentElement.attributes).forEach(attr => {
        if (attr.name.includes('extensionid')) {
          document.documentElement.setAttribute(attr.name, attr.value)
        }
      })
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {mounted ? (
            <div suppressHydrationWarning>{children}</div>
          ) : (
            <div style={{ visibility: 'hidden' }}>{children}</div>
          )}
        </Providers>
      </body>
    </html>
  )
}