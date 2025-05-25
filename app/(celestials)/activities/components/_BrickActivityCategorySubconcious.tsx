'use client'
import React from 'react'

// @@ Import utility hooks @@
import { motion } from 'framer-motion'

interface ActivitySubConcious {
    id: number
    icon: string
    name: string
    link: string
    status: string
    isUsingIcon: boolean
}

export const ActivitySubConciousData: ActivitySubConcious[] = [
    {
        id: 1,
        icon: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_themes%2Ftheme-misc-subconcious.svg?alt=media&token=cba42b13-9e97-4145-ad8d-e26f3b1b2714',
        name: 'Subconcious',
        link: '/activities/intro-activity-intros',
        status: 'Not Launched',
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

const BrickActivitySubConcious: React.FC<IntroCardProps> = (props: any) => {
    let cardData = ActivitySubConciousData[0]
    // @ts-ignore
    return (<div key={cardData.id} className={'al_category_card al_icon_card al_icon_card_full_bg dashboard_brick brick p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container'} style={{ 'background': `url(${cardData.icon ? cardData.icon : cardData.icon})`, 'backgroundSize': `${cardData.isUsingIcon === true ? 'contain' : 'cover'}`, 'backgroundPosition': `${cardData.isUsingIcon === true ? 'center -22px' : 'center'}`, 'position': 'relative', 'backgroundRepeat': 'no-repeat', 'backgroundSize': '85% 100%' }}>
        <div className='activity_brick brick'>
            <a href={cardData.link}>
                <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                    <div className='custom_full_width_placholder_container'>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                    <div className='custom_placeholder'></div>
                </motion.div>
                <h2 className='mt-2 text-center al_icon_text py-4 text-xl font-semibold relative'>{cardData.name}</h2>
            </a>
        </div>
    </div>)
}

export default BrickActivitySubConcious