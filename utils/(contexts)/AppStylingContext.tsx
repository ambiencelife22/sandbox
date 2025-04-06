/* AppStylingContext.tsx */
'use client'
import { createContext, ReactNode, useEffect } from 'react'

import '@/app/app.css'

interface GlobalStyleProviderProps {
  children: ReactNode
}

const AppStylingContext = createContext(null)

export const AppStylingProvider: React.FC<GlobalStyleProviderProps> = ({ children }) => {

  return (
    <AppStylingContext.Provider value={null}>
      {children}
    </AppStylingContext.Provider>
  )
}

export default AppStylingContext
