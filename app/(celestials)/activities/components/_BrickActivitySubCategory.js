/* BrickActivitySubCategory.js in [CategoryParam]/page.tsx */
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

import ACTIVITIESProgressBar from './_Activities_ProgressBar'

function BrickActivitySubCategory({
  icon,
  animateDuration,
  parentCategory,
  id,
  activityTheme,
  calculateTotalThemeProgress,
  themeTokens }) {

  const [userSessionToken, setuserSessionToken] = useState({})
  const [urlParams, setURLParams] = useState('')
  const [lastSegment, setLastSegment] = useState('')
  const precategoryLink = icon.name.replaceAll('-', '').toLowerCase()
  const categoryLink = precategoryLink.replaceAll(' ', '-').toLowerCase()
  const [MasterLock, setMasterLock] = useState(false)
  const progressData = calculateTotalThemeProgress()
  const currentProgress = progressData.find(progress => progress.xtheme.toLowerCase() === icon.name.toLowerCase())
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check user session and permissions
      let activeSession = JSON.parse(localStorage.getItem('session'))
      let access = activeSession?.loginStatus || ''

      if (access !== 'Granted') {
        window.location.href = window.location.origin + '/eh'
      }

      setuserSessionToken(activeSession)

      // Handle URL parameters and lastSegment
      const path = window.location.pathname
      const currentURL = window.location.href
      const findParamsInUrl = path.startsWith('/') ? path.substring(1) : path
      setURLParams(currentURL)

      const parts = window.location.href.split('/')
      const segment = parts.pop() || parts.pop()  // handle potential trailing slash
      setLastSegment(segment) // <-- set the value to the state variable

      if (activeSession.channel == 'Glow+') {
        setMasterLock(true)
      }

    }


  }, [])


  return (
    <>
      <Link href={`/activities/${parentCategory}/${categoryLink}`}>
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: animateDuration }}>
          <div
            key={icon.id}
            className={MasterLock === true
              ? `activity_category_card activity_icon_card activity_icon_card_full_bg ${icon.premium != 'NO' ? 'al_premium_icon_bg' : ''} p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container`
              : themeTokens === 0 ? 'activity_category_card activity_icon_card activity_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer dashboard_brick brick custom_full_width_placholder_container' :
                `activty_category_card activity_icon_card activity_icon_card_full_bg  p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container`}
            style={{
              'background': `url(${icon.imagetwo ? icon.imagetwo : icon.image})`,
              'backgroundSize': `${icon.imagetwo ? '88%' : '88%'}`,
              'backgroundPosition': `${icon.imagetwo ? 'center -11px' : 'center'}`,
              'position': 'relative',
              'backgroundRepeat': 'no-repeat',
              'backgroundSize': `${lastSegment == 'core' ? '200%' : '77%'}`
            }}

          >
            <ACTIVITIESProgressBar progressPercentage={currentProgress?.progressPercentage || 0} />
            <div className={`dynamic_category_bg`}>
              <h2 className='mt-2 activity_icon_text py-4 text-xl font-semibold relative w-full'>{icon.name}</h2>
              <div className={icon.premium != 'NO' ? 'al_premium_icon' : ''}>
                <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                  <div className='custom_full_width_placholder_container'>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                  <div className='custom_placeholder'></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  )
}

export default BrickActivitySubCategory