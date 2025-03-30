/* FooterGrowers.js */
'use client'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'
import React from 'react'
import { motion } from 'framer-motion'
// import { HomeLink } from '@/app/(a-growers)/eh/components/_NebulaLinks'
// import { FreebiesLink } from '@/app/(a-growers)/eh/components/_NebulaLinks'
// import { XclusivesLink } from '@/app/(a-growers)/eh/components/_NebulaLinks'
// import { LifeDesignLink } from '@/app/(a-growers)/eh/components/_NebulaLinks'


export default function Footer() {
  return (
    <div className='fixed_footer'>
      <motion.div initial={{ y: 1020, opacity: 0, scale: 1 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <footer className="bg-white">
          <div className="mx-auto max-w-5xl py-4 mt-0 px-4 sm:px-6 md:flex md:items-center md:justify-center lg:px-8">
            <div className="flex justify-center space-x-4 md:order-2 dynamic_gap">
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.7 }}>
                <HomeLink />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }}>
                <FreebiesLink />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2 }}>
                <XclusivesLink />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.9 }}>
                <LifeDesignLink />
              </motion.div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}