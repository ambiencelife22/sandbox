/* TimerContext.tsx */
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface TimerContextProps {
    isPaused: boolean
    setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined)

interface TimerProviderProps {
    children: ReactNode
}

export const useTimer = (): TimerContextProps => {
    const context = useContext(TimerContext)
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider')
    }
    return context
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
    const [isPaused, setIsPaused] = useState<boolean>(false)

    return (
        <TimerContext.Provider value={{ isPaused, setIsPaused }}>
            {children}
        </TimerContext.Provider>
    )
}
