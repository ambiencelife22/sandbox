/* BrickActivityType.js in [SubCategoryParam]/page.tsx */
'use client'
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import ACTIVITIESProgressBar from './_Activities_ProgressBar'

function BrickActivityType(props) {
  const {
    id,
    backgroundImage,
    text,
    seedsProgressPercentage,
    typerProgressPercentage,
    cardsProgressPercentage,
    scrambleProgressPercentage,
    animateDuration,
    unlocked,
    activityTokens,
  } = props

  const [allBricksUnlocked, setAllBricksUnlocked] = useState(false)

  const handleOnClick = () => {
    props.showModal()
  }

  const handleLockedContent = () => {
    console.log('locked content')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check user session and permissions
      let activeSession = JSON.parse(localStorage.getItem('session'))
      let access = activeSession?.loginStatus || ''

      if (access !== 'Granted') {
        window.location.href = window.location.origin + '/eh'
      }

      if (activeSession.channel == 'Glow+') {
        setAllBricksUnlocked(true)
      }

    }
  }, [])


  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: animateDuration }}>
      <button onClick={() => (unlocked || allBricksUnlocked) ? handleOnClick() : handleLockedContent()} style={{ 'width': '100%', }}>
          <div
            key={id}
            className={!activityTokens.includes(text.toLowerCase())
              ? `activity_icon_card w-full activity_icon_card_full_bg ${
                  unlocked || allBricksUnlocked ? 'al_premium_icon_bg' : ''
                } p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container ${
                  !(unlocked || allBricksUnlocked) ? 'dashboard_brick' : ''
                } brick`
              : `activity_icon_card w-full activity_icon_card_full_bg ${
                  unlocked || allBricksUnlocked ? 'al_premium_icon_bg' : ''
                } p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container ${
                  !(unlocked || allBricksUnlocked) ? 'dashboard_brick' : ''
                }`}
            style={{
              'background': `url(${backgroundImage})`,
              'backgroundSize': '55%',
              'backgroundPosition': 'center',
              'position': 'relative',
              'backgroundRepeat': 'no-repeat'
            }}
          >
            <h2 className='activity_icon_text text-xl font-semibold'>{text}</h2>
            {text === 'SEEDS' && <ACTIVITIESProgressBar progressPercentage={seedsProgressPercentage} activityName='Seeds' />}
            {text === 'TYPER' && <ACTIVITIESProgressBar progressPercentage={typerProgressPercentage} activityName='Typer' />}
            {text === 'CARDS' && <ACTIVITIESProgressBar progressPercentage={cardsProgressPercentage} activityName='Cards' />}
            {text === 'SCRAMBLE' && <ACTIVITIESProgressBar progressPercentage={scrambleProgressPercentage} activityName='Scramble' />}

            <div className={`dynamic_category_bg`} style={{ position: 'relative', height: '100%' }}>
              <div className={unlocked || allBricksUnlocked === true ? 'al_premium_icon' : ''}>
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: animateDuration }}>
                  <div className='custom_full_width_placholder_container'>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                  <div className='custom_placeholder'></div>
                </motion.div>
              </div>
            </div>
          </div>
        </button>
      </motion.div>
    </>
  )
}

export default BrickActivityType
