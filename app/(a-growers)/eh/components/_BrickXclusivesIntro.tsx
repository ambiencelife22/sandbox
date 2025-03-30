/* _BrickXclusivesIntro.tsx */
'use client'
import React from 'react'

// @@ Import structure functions
import Link from 'next/link'

// @@ Import utility hooks @@
import { motion } from 'framer-motion'

interface BrickAppIntro {
    id: number
    icon: string
    name: string
    link: string
    isUsingIcon: boolean
}

export const introData: BrickAppIntro[] = [
    {
        id: 1,
        icon: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fapp-intros.svg?alt=media&token=dbae1c30-6c0d-44cd-a87b-891063a02ca7&_gl=1*12hwek5*_ga*MTg5MjU4Mzg0My4xNjk1MTY1MTYz*_ga_CW55HF8NVT*MTY5NzIyNjAxNy4xMi4xLjE2OTcyMjYwNjIuMTUuMC4w  ',
        name: 'Welcome!',
        link: '/intros/intro-xclusives',
        isUsingIcon: true,
    },
]

const hoverEnlarge = {
    scale: 1.04,
    transition: {
        duration: .8,
    }
}

const initial = {
    scale: 1,
    rotate: 0
}

interface BrickXclusivesIntroCardProps {
    id: number
    icon: string
    name: string
    link: string
    isUsingIcon: boolean
}

const BrickXclusivesIntro: React.FC<BrickXclusivesIntroCardProps> = (props: any) => {
    let cardData = introData[0]
    const classBase = 'activity_category_card activity_icon_card activity_icon_card_full_bg p-4 rounded-xl shadow-2xl cursor-pointer intro_card_default'
    const unlockedClass = `${classBase} custom_full_width_placholder_container`

    return (
        <Link href={cardData.link}>
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2 }}
                whileHover={hoverEnlarge}
                initial={initial}
            >
                <div
                    key={cardData.id}
                    className={unlockedClass}
                    style={{
                        'background': `url(https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fapp-intros.svg?alt=media&token=dbae1c30-6c0d-44cd-a87b-891063a02ca7&_gl=1*12hwek5*_ga*MTg5MjU4Mzg0My4xNjk1MTY1MTYz*_ga_CW55HF8NVT*MTY5NzIyNjAxNy4xMi4xLjE2OTcyMjYwNjIuMTUuMC4w)`,
                        'backgroundSize': '88% 88%',
                        'backgroundPosition': 'center',
                        'position': 'relative',
                        'backgroundRepeat': 'no-repeat',
                    }}
                >
                    <div className={`dynamic_category_bg`}>
                        <h2 className='mt-2 activity_icon_text py-2 text-lg font-semibold relative w-full'>Xclusives Intro</h2>
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
        </Link>
    )
}

export default BrickXclusivesIntro