'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface Intro {
    id: number
    icon: string
    name: string
    link: string
    isUsingIcon: boolean
}

// @@ Deron update this icon

export const introData: Intro[] = [
    {
        id: 1,
        icon: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fapp-intros.svg?alt=media&token=dbae1c30-6c0d-44cd-a87b-891063a02ca7&_gl=1*12hwek5*_ga*MTg5MjU4Mzg0My4xNjk1MTY1MTYz*_ga_CW55HF8NVT*MTY5NzIyNjAxNy4xMi4xLjE2OTcyMjYwNjIuMTUuMC4w',
        name: 'About Activities',
        link: '/activities/intro-activities',
        isUsingIcon: true,
    },
]

interface IntroCardProps {
    id: number
    icon: string
    name: string
    link: string
    isUsingIcon: boolean
}

const BrickActivityIntro: React.FC<IntroCardProps> = (props: any) => {
    let cardData = introData[0]
    // @ts-ignore
    return (
        <div
            key={cardData.id}
            className={'al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container intro_card_default'}
            style={{
                'background': `url(${cardData.icon ? cardData.icon : cardData.icon})`,
                'backgroundSize': '88% 88%',
                'backgroundPosition': 'center',
                'position': 'relative',
                'backgroundRepeat': 'no-repeat'
            }}
        >
            <div className=''>
                <a href={cardData.link}>
                    <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                        <div className='custom_full_width_placholder_container'>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                        <div className='custom_placeholder'></div>
                    </motion.div>
                    <h2 className='mt-2 activity_icon_text py-2 text-lg font-semibold relative w-full'>{cardData.name}</h2>
                </a>
            </div>
        </div>
    )
}

export default BrickActivityIntro