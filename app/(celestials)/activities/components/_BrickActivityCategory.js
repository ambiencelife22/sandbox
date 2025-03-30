/* BrickActivityCategory.js in actvities/page.tsx */
'use client'
import React, { useEffect, useState } from 'react'

// @@ Import structure functions
import Link from 'next/link'

// @@ Import utility hooks @@
import { motion } from 'framer-motion'


function BrickActivityCategory({ icon, categoryID, categoriesMeta, onClick }) {
  const [userSessionToken, setuserSessionToken] = useState({})
  const precategoryLink = icon.name.replaceAll('-', '')
  const categoryLink = precategoryLink.replaceAll(' ', '-').toLowerCase()
  const [MasterLock, setMasterLock] = useState(true)
  const [isUsingIcon, setIsUsingIcon] = useState(false)

  const channel = userSessionToken.channel
  const isXclusivesMembership = ['Glow', 'Glow+', 'Ambience'].includes(channel)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const parts = pathname.split('/')
      const lastPart = parts[parts.length - 1]

      // check if user is allowed access
      let activeSession = JSON.parse(localStorage.getItem('session'))
      let access = ''
      if (activeSession) {
        access = activeSession['loginStatus']
      }

      // fetch latest user permissions, set the state
      if (access != 'Granted') {
        if (typeof window !== 'undefined') {
          window.location.href = window.location.origin + '/eh'
        }
      }
      setuserSessionToken(activeSession)

      if (icon.image.includes('.svg')) {
        setIsUsingIcon(true)
      }

      // @@ Future use below @@

      // if (categoryID !== 0 && categoryID !== 16) {
      //   const previewCategoryIndex = categoryID - 1
      //   let propertyKey = categoriesMeta.meta[previewCategoryIndex].token

      //   // refresh points from db
      //   let pointsMeta = JSON.parse(localStorage.getItem('points'))
      //   let pointsEarnInPreviousCategory = pointsMeta.meta[0].Categories_Points[0][propertyKey]

      //   if (pointsEarnInPreviousCategory > 120) {
      //     setuserCCToken([...userCCToken, categoryID])
      //   }

      //   if (activeSession.channel == 'Glow') {
      //     setuserCCToken([...userCCToken, 1])
      //   }
      //   if (activeSession.channel == 'Ambience') {
      //     setuserCCToken([...userCCToken, 1])
      //   }
      // }

      if (['Glow', 'Ambience', 'Glow+'].includes(activeSession.channel)) {
        setMasterLock(false)
      }
    }
  }, [])

  const classNameToApply = MasterLock
    ? 'al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer dashboard_brick brick custom_full_width_placholder_container'
    : 'al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container'


  return (
    <>
      <Link href={`/activities/` + icon.name}>
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
          <div
            key={icon.id}
            className={classNameToApply}
            style={{
              'background': `url(${icon.imagetwo ? icon.imagetwo : icon.image})`,
              'backgroundSize': `${isUsingIcon === true ? '85% 100%' : categoryID === 2 ? '200%' : 'cover'}`,
              'backgroundPosition': `${isUsingIcon === true ? 'center -22px' : 'center'}`,
              'position': 'relative',
              'backgroundRepeat': 'no-repeat'
            }}>
            <div className={`dynamic_category_bg`}>
              <h2 className='mt-2 text-center al_icon_text py-4 text-xl font-semibold relative'>{icon.name}</h2>
              <div className={icon.premium != 'NO' ? 'al_premium_icon' : ''}>
                <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                  <div className='custom_full_width_placholder_container'>
                    {/* Retained the commented-out icon for reference */}
                    {/* <img src={icon.image} alt={icon.name} className='mx-auto aspect-[3/2]' data-imageCopyDescription={icon.imageDescription} /> */}
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

export default BrickActivityCategory