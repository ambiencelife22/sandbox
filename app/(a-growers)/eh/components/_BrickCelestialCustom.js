// BrickCelestial.js for [NebulaParam]/page.tsx
'use client'
import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

// @@ Import structure functions @@
import Link from 'next/link'

const allowedChannels = ['Ambience', 'Glow', 'Glow+', 'Aware']

function BrickCelestial({ className, icon, userSessionToken, NebulaParam, currentChannel }) {
    const [isUsingIcon, setIsUsingIcon] = useState(false)
    const celestialLink = icon.captionetta.replace(/[-\s]+/g, '-').toLowerCase()

    useEffect(() => {
        if (icon && icon.contentImg) {
            setIsUsingIcon(icon.contentImg.includes('.svg'))
        }

    }, [icon])

    const isChannelAllowed = allowedChannels.includes(currentChannel)

    const targetURL = `/${icon.CelestialParam}`
    const cardclassName = getCardclassName(userSessionToken?.ccdd_Token || '', icon, isChannelAllowed)
    const backgroundImageStyle = getBackgroundImageStyle(icon, isUsingIcon, icon.id)

    const cardContent = (
        <motion.div key={icon.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
            <div className={`${cardclassName} ${icon.premium != 'NO' ? 'al_premium_icon_bg' : ''}`} style={backgroundImageStyle}>
                <div className='dynamic_category_bg'>
                    <h2 className='mt-2 text-center al_icon_text py-4 text-xl font-semibold relative'>{icon.captionetta}</h2>
                    <div className={icon.premium !== 'NO' ? 'al_premium_icon' : ''}>
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
    )


    return icon.contentStatus !== 'Not Launched' ? (
        <Link href={targetURL}>{cardContent}</Link>
    ) : (
        cardContent
    )
}

function getCardclassName(token, icon, isChannelAllowed) {
    const baseClasses = 'sub_al_card al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-2xl'
    let conditionClasses = token === '' ? 'cursor-pointer custom_full_width_placholder_container' : 'cursor-pointer custom_full_width_placholder_container'

    // Check if contentStatus is 'Not Launched' and add the new classes
    if (icon.contentStatus === 'Not Launched') {
        conditionClasses += ' dashboard_brick brick'
    }

    if (isChannelAllowed === false) {
        conditionClasses += ' dashboard_brick brick'
    }

    return `${baseClasses} ${conditionClasses}`
}

function getBackgroundImageStyle(img, isIcon, celestialId) {
    const position = isIcon ? 'center' : 'center'
    // const size = celestialId === 2.2 ? 'cover' : (isIcon ? '85% 55%' : 'cover')
    const size = '85% 55%'

    return {
        background: `url(${img.contentImg}) ${position} / ${size} no-repeat`
    }
}


export default BrickCelestial
