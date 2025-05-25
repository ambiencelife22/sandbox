/* __SeedsActionContext.tsx */
'use client'
import React, { createContext, useState } from 'react'

// @@ Import Timer Context @@
import { useTimer } from '../../../(a-growers)/components/activities/_TimerContext'

interface SeedsActionContextProps {
    handleCorrectSeedsActions: (actionPhrase: string, xTheme: string, phraseID: string) => void
    isPaused: boolean
}

type SeedsActionProviderProps = {
    children: React.ReactNode
    userID: string
    sessionID: number
    handleCorrectSeedsActions: (actionPhrase: string, xTheme: string, phraseID: string) => void
}


const SeedsActionContext = createContext<SeedsActionContextProps>({
    handleCorrectSeedsActions: (actionPhrase: string, xTheme: string, phraseID: string) => {},
    isPaused: false,
})


export const SeedsActionProvider: React.FC<SeedsActionProviderProps> = ({ children, userID, sessionID, handleCorrectSeedsActions }) => {
    const [showSeedsCorrectCheckMark, setShowSeedsCorrectCheckMark] = useState(false)
    const { isPaused } = useTimer()

    return (
        <SeedsActionContext.Provider 
            value={{
                handleCorrectSeedsActions: handleCorrectSeedsActions,
                isPaused: isPaused,
            }}
        >
            {children}
        </SeedsActionContext.Provider>
    )
}


export const useSeedsActions = () => {
    const [isAnimationComplete, setIsAnimationComplete] = useState(false)
    const handleAnimationComplete = () => {
        setIsAnimationComplete(true)
    }
    
    const resetAnimationStatus = () => {
        setIsAnimationComplete(false)
    }
    const context = React.useContext(SeedsActionContext)
    if (!context) {
        throw new Error('useSeedsActions must be used within a SeedsActionProvider')
    }
    return context 
}
