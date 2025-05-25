/* app layout.tsx */
'use client'
import './app.css'
import { AnalyticsWrapper } from './components/analytics'
import React, { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [Domain, setDomain] = useState("")

  useEffect(() => {
    setDomain(window.location.origin)
  }, [Domain])

  return (
    <html>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true'></link>
        <link href='https://fonts.googleapis.com/css2?family=Prata&display=swap' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap' rel='stylesheet'></link>
        <link rel="manifest" href={Domain + '/manifest.json'} />
      </head>
      <body>
        <div className='AmbienceLife'>
          {children}
          <AnalyticsWrapper />
        </div>
      </body>
    </html>
  )
}
