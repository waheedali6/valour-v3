'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css"
import "./responsive.css"

import PageTransition from "@/components/PageTransition"
import ScrollProvider from "@/components/ScrollProvider"

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body >
        {/* <PageTransition />
        <ScrollProvider> */}
          {children}
        {/* </ScrollProvider> */}
      </body>
    </html>
  )
}
