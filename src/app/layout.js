'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css"
import "./responsive.css"
import { Provider } from 'react-redux'
import { store } from './store'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body >
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
