'use client'
import React, { useState, useEffect } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

// @@ Import external structure functions @@
import { DotsLoadingAnimation } from '../../../../components/ui/loading-animation'
// import NavBar from '@/app/(a-growers)/components/NavBarGrowers'
// import Footer from '@/app/(a-growers)/components/FooterGrowers'
import GridContainer from '../../../components/(grid_components)/_grid_container'

// import ActivityIntroIcon from '@/app/(icons)/(svgs)/ActivityIntroIcon'

// !! MILESTONE !! 300 videos live in DESTINATIONS!

function ActivityIntrosPage(props: any) {
  const [currentCategory, setCurrentCategory] = useState(null)
  const [User, setUser] = useState(Object)
  const [UserPermissions, setUserPermissions] = useState(Object)
  const [userSessionToken, setuserSessionToken] = useState(Object)

  const [loading, setLoading] = useState(true)

  const homeIcon = [
    {
      id: 1,
      image: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-seeds.svg?alt=media&token=661ee0ac-0763-4cd2-a878-ceea3ba4c327',
      imagetwo: null,
      alt: 'Seeds Intro',
      captionetta: 'Seeds Intro',
      status: 'Launched',
      linkerdoodle: 'intro-seeds',
    },
    {
      id: 2,
      image: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-typer.svg?alt=media&token=5ac0dfd1-3264-4976-a392-5ecaaf82b5ad',
      imagetwo: null,
      alt: 'Typer Intro',
      captionetta: 'Typer Intro',
      status: 'Launched',
      linkerdoodle: 'intro-typer',
    },
    {
      id: 3,
      image: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-cards.svg?alt=media&token=63e01c8b-3ada-4b2c-8084-5509ca68ee56',
      imagetwo: null,
      alt: 'Cards Intro',
      captionetta: 'Cards Intro',
      status: 'Launched',
      linkerdoodle: 'intro-cards',
    },
    {
      id: 4,
      image: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-scramble.svg?alt=media&token=2ff75bc9-73d7-4390-9ae1-52aa9110381f',
      imagetwo: null,
      alt: 'Scramble Intro',
      captionetta: 'Scramble Intro',
      status: 'Launched',
      linkerdoodle: 'intro-scramble',
    },
  ]

  useEffect(() => {
    setTimeout(() => {
        // check if user is allowed access
        // @ts-ignore
        let activeSession = JSON.parse(localStorage.getItem('session'))
        let access = ''
        if (activeSession) {
            access = activeSession['loginStatus']
        }

        // fetch latest user permissions, set the state

        if (access != 'Granted') {
            if (typeof window !== 'undefined') {
                window.location.href = window.location.origin + '/activities'
            }
        }
        setuserSessionToken(activeSession)
        setUser(activeSession)

        setLoading(false)
    }, 1100)
  }, [])

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'>
        <DotsLoadingAnimation />
    </div>
  }


  if (User.firstName != null) {
    return (
      <main className='Woohoo pjs h-7/8'>
        {/* <NavBar /> */}
        <div className='page_headline pt-5 pb-10 mt-2'>
          <div className='max-w-[1000px] m-auto flex'>
          </div>
        </div>
        <div className='al_home py-8 pb-[121px]'>
          <div className='al_subcategory_container'>
            <div className='mt-[3rem] al_page_title max-w-[1280px] m-auto mb-0 pl-[20px] lg:flex md:block justify-between'>
              <h1 className='pjs text-3xl font-bold text-left mb-2 p_color relative'>Activity Intros</h1>
              <div className='section_descriptor max-w-lg'>
                <p className='pjs text-lg p_color pjs non-italic pb-2'>Gamified, interactive, non-personalized features that utilize the power of words to reinforce a self-empowering mindset</p>
              </div>
            </div>

            <GridContainer>
              {homeIcon.map((icon) => (

                <motion.div key={icon.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                  <div key={icon.id} className={icon.status === 'Not Launched'
                    ? 'sub_al_card al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container dashboard_brick brick not_launched'
                    : icon.status === 'Under Construction'
                      ? 'sub_al_card al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container dashboard_brick brick under_construction'
                      : 'sub_al_card al_category_card al_icon_card al_icon_card_full_bg p-4 rounded-xl shadow-md cursor-pointer custom_full_width_placholder_container'} style={{ 'background': `url(${icon.imagetwo ? icon.imagetwo : icon.image})`, 'backgroundPosition': `${icon.imagetwo ? 'center 0px' : 'center'}`, 'position': 'relative', 'backgroundRepeat': 'no-repeat', 'backgroundSize': '100% 50%' }}>
                    <div className={`dynamic_category_bg `}>
                      <div
                        key={icon.alt}
                        className={
                          icon.status === 'Not Launched'
                            ? '  not_launched'
                            : icon.status === 'Under Construction'
                              ? ' under_construction'
                              : ''
                        }
                      >
                        <Link href={icon.linkerdoodle}>
                          <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                            <div className='custom_full_width_placholder_container'>
                              {/* <img src={icon.imagetwo ? icon.imagetwo : icon.image} alt={icon.name} className='mx-auto aspect-[3/2]' data-imageCopyDescription={icon.imageDescription} /> */}
                            </div>
                          </motion.div>
                          <motion.div initial={{ opacity: 1, scale: 0 }} animate={{ opacity: 0, scale: 1 }} transition={{ duration: 0.2 }}>

                            <div className='custom_placeholder'></div>

                          </motion.div>
                          <h2 className='al_icon_text mt-2 text-center py-4 text-xl font-semibold relative bottom-0'>{icon.captionetta}</h2>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </GridContainer>
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    )
  }
}

export default ActivityIntrosPage