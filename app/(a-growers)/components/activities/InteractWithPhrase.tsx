// import useLocalStorage from '@/utils/useLocalStorage'

// const interactWithPhrase = (activityId: string, phraseId: string, correct: boolean) => {
//     // Get current stats from local storage
//     const [interactionStats, setInteractionStats] = useLocalStorage('interactionStats', {})

//     if(correct) {
//         // Update the local storage with the new interaction
//         const updatedStats = { ...interactionStats }
//         updatedStats[activityId] = updatedStats[activityId] || {}
//         updatedStats[activityId][phraseId] = (updatedStats[activityId][phraseId] || 0) + 1
//         setInteractionStats(updatedStats)
//     }
// }

// export default interactWithPhrase

import React, { FC } from 'react'

const WelcomeEmail: FC = () => {
  return (
    <main className='Woohoo pjs h-7/8'>
      <div className='wrapper theme_bg pb-[121px]'>
        
      </div>
    </main>
  )
}

export default WelcomeEmail
