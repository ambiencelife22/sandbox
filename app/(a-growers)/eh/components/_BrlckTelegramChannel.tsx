/* _BrlckTelegramChannel.tsx */
import React, { FC } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import { TELEGRAM_IMAGE } from '@/app/(a-growers)/eh/components/_SMLinks'


const hoverEnlarge = {
    scale: 1.04,
    transition: {
        duration: 0.8,
    },
}

const initial = {
    scale: 1,
    rotate: 0,
}


const BrlckTelegramChannel: FC = () => {
    return (
        <a href='https://ambience.life'>
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2 }}
                whileHover={hoverEnlarge}
                initial={initial}
            >
                <div
                    className="activity_category_card activity_icon_card activity_icon_card_full_bg p-4 rounded-xl shadow-2xl cursor-pointer intro_card_default"
                    style={{
                        backgroundImage: `url("${TELEGRAM_IMAGE}")`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        position: 'relative',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="dynamic_category_bg">
                        <h2 className="mt-2 activity_icon_text py-2 text-lg font-semibold relative w-full">Telegram Content Notifications</h2>
                        <div>
                            <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                                <div className="custom_full_width_placholder_container"></div>
                            </motion.div>
                            <motion.div initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>
                                <div className="custom_placeholder"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </a>
    )
}

export default BrlckTelegramChannel
