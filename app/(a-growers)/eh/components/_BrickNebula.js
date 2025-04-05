// BrickNebula.js for a-growers/eh page.tsx
'use client'
import React, { useEffect, useState } from 'react'

import { XternalLinkIcon } from '../../../(icons)/XternalLinkIcon'

import { motion } from 'framer-motion'

// @@ Import structure functions @@
import Link from 'next/link'

const hoverEnlarge = {
    scale: 1.044,
    transition: {
        duration: .8,
    }
}

const initial = {
    scale: 1,
    rotate: 0
}

function BrickNebula({ icon, userSessionToken }) {
    const [isUsingIcon, setIsUsingIcon] = useState(false)

    useEffect(() => {
        if (icon && icon.contentImg) {
            setIsUsingIcon(icon.contentImg.includes('.svg'))
        }
    }, [icon])

    const targetURL = `${icon.NebulaParam}`
    const cardclassName = getCardclassName(userSessionToken?.ccdd_Token || '')
    const backgroundImageStyle = getBackgroundImageStyle(icon, isUsingIcon, icon.id)


    if (icon.id === 4) {
        return (
            <a href={targetURL} target='_blank' rel='noopener noreferrer'>
                <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.2 }}
                    whileHover={hoverEnlarge}
                    initial={initial}
                >
                    <div className={`${cardclassName} home_content_item telegram_icon `} style={{ backgroundImage: `url(${icon.contentImg})`, backgroundRepeat: 'no-repeat' }}>
                        <span className='text-md font-semibold p_color flex justify-end h-6'></span>
                        <div className=''>
                            <h2 className='mt-2 text-center al_icon_text py-4 text-xl font-semibold relative'>{icon.captionetta}</h2>
                            <div className=''>
                                <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                                    <div className='custom_full_width_placholder_container'></div>
                                </motion.div>
                                <motion.div initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                                    <div className='custom_placeholder'></div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </a>
        )
    }

    return (
        <Link href={targetURL}>
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2 }}
                whileHover={hoverEnlarge}
                initial={initial}
            >
                <div className={`${cardclassName} ${icon.premium != 'NO' ? 'home_content_item al_premium_icon_bg' : ''}`} style={backgroundImageStyle}>
                    <span className='text-md font-semibold p_color flex justify-end h-6'></span>
                    <div className='dynamic_category_bg'>
                        <h2 className='mt-2 text-center al_icon_text py-4 text-xl font-semibold relative'>{icon.captionetta}</h2>
                        <div className={icon.premium !== 'NO' ? 'al_premium_icon' : ''}>
                            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                                <div className='custom_full_width_placholder_container'></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                                <div className='custom_placeholder'></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )


    function getCardclassName(token) {
        const baseClasses = 'sub_al_card al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-xl'
        const conditionClasses = token === '' ? 'cursor-pointer custom_full_width_placholder_container' : 'cursor-pointer custom_full_width_placholder_container'
        return `${baseClasses} ${conditionClasses}`
    }

    function getBackgroundImageStyle(img, isIcon, id) {
        const position = 'center'
        let size = isIcon ? '85% 85%' : 'cover'


        return {
            background: `url(${img.contentImg}) ${position} / ${size} no-repeat`
        }
    }
}

export default BrickNebula
