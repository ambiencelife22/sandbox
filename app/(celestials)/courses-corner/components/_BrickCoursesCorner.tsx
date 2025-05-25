/* _BrickCoursesCorner.tsx */
'use client'
import React from 'react'
import { motion } from 'framer-motion'


interface BrickProps {
    animateDuration: number
}


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

const icon = [
    {
      id: 1,
      image: '',
      contentImgAlt: 'Human Harmony',
      captionetta: 'Human Harmony',
      courseLink: 'hh',
      contentStatus: 'Unlocked',
      pageDescrip1: '',
      pageDescrip2: '',
      premium: 'NO',
    },
]


const BrickCoursesCorner: React.FC<BrickProps> = ({
    animateDuration
}) => {

    const classBase = 'activity_category_card activity_icon_card activity_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer'
    const unlockedClass = `${classBase} custom_full_width_placholder_container`


    return (
        <a href='/courses-corner/hh'>
            <motion.div 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: animateDuration }}
                whileHover={hoverEnlarge}
                initial={initial}
            >
                <div 
                    className={unlockedClass}
                    style={{
                        'background': `url(https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fjournal.svg?alt=media&token=083afda4-4c5e-45bc-9738-0b07eab92f8e)`,
                        'backgroundSize': '88% 88%',
                        'backgroundPosition': 'center',
                        'position': 'relative',
                        'backgroundRepeat': 'no-repeat',
                    }}
                >
                    <span className='text-md font-semibold p_color flex justify-end h-6'></span>
                    <div className={`dynamic_category_bg`}>
                        <h2 className='mt-2 activity_icon_text py-2 text-lg font-semibold relative w-full'>Human Harmony</h2>
                        <div className=''>
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
        </a>
    )  
}

export default BrickCoursesCorner
