/* a-growers/eh page.tsx */
'use client'
import React, { useState, useEffect } from 'react'

import Link from 'next/link'

// @@ Import layout functions @@
import Header from './header'
import BrickContainer from './components/_BrickContainer'
import BrickNebula from './components/_BrickNebula' 

// @@ Import external ux functions @@
import BrickAppIntro from '../../(a-growers)/components/_BrickAppIntro'

import { XCLUSIVES_IMAGE, LIFEDESIGN_IMAGE, FREEBIES_IMAGE } from '../../(a-growers)/eh/components/_NebulaLinks'


// @@ Import utility hooks @@
import { motion } from 'framer-motion'

const homeIcon = [
    {
        id: 1,
        contentImg: XCLUSIVES_IMAGE,
        contentImgAlt: 'ambience.LIFE Exclusives',
        captionetta: 'Xclusives',
        NebulaParam: 'eh/xclusives',
        contentStatus: 'unlocked',
        premium: 'YES',
    },
    {
        id: 2,
        contentImg: LIFEDESIGN_IMAGE,
        contentImgAlt: 'ambience.LIFE Life Design',
        captionetta: 'Life Design',
        NebulaParam: 'eh/lifedesign',
        contentStatus: 'unlocked', 
        premium: 'YES',
    },
    {
        id: 3,
        contentImg: FREEBIES_IMAGE,
        contentImgAlt: 'ambience.LIFE Freebies',
        captionetta: 'Free For Everyone',
        NebulaParam: 'eh/freebies',
        contentStatus: 'unlocked', 
        premium: 'NO',
    }
]


interface IconType {
    id: number
    image: string
    imagetwo: string | null
    contentImgAlt: string
    captionetta: string
    contentStatus: string
    NebulaParam: string
    premium: string
}

interface IconCardProps {
    icon: IconType
    userSessionToken: { ccdd_Token: string } | null
}

interface UserType {
    firstName: string
}

interface EHPageProps {
    user: UserType | null
}


function getGreeting(hour: number) {
    if (hour < 12) return 'Good Morning'
    if (hour >= 12 && hour <= 17) return 'Good Afternoon'
    return 'Good Evening'
}


function EHPage() {
    
    const [user, setUser] = useState<UserType | null>(null)
    const [userSessionToken, setuserSessionToken] = useState<{ ccdd_Token: string } | null>(null)

    useEffect(() => {
        // check if user is logged in
        const activeSession = JSON.parse(localStorage.getItem('session') || '{}')

        setUser(activeSession)
        setuserSessionToken(activeSession)
    }, [])
    

    const greet = getGreeting(new Date().getHours())
    const pageTitle = `${greet}, ${user?.firstName}`


    return (
        <div className='al_home py-8 text-[Plus Jakarta Sans] mt-[22px]'>
            <div className='header_div pt-[44px]'>
                <Header pageTitle={pageTitle} pageDescrip1={'Welcome to the ambience.LIFE App!'} pageDescrip2={''} />
            </div>
            <div className='al_category_container'>
                <BrickContainer>
                    <BrickAppIntro id={0} icon={''} name={''} link={''} isUsingIcon={true} />
                    {homeIcon.map(icon => <BrickNebula key={icon.id} icon={icon} userSessionToken={userSessionToken} />)}
                </BrickContainer>
            </div>
        </div>
    )
}


export default EHPage
