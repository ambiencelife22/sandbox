'use client'
import { useState, useEffect } from 'react'

// @@ Importstructure functions @@
import Link from 'next/link'

// @@ Import data hooks @@
import { Dialog } from '@headlessui/react'

// @@ Import points hooks @@
import { updateUserPoints, getUserPoints } from '../../../(libs)/helpers'

// @@ Import icons @@
import icon from '../../../app/ambience-03-White.png'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// @@ Import external functions @@
import ModalContainer from '/app/components/ModalContainer'

const TrophyIcon = 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fachievements.svg?alt=media&token=52ca6706-bfec-4c22-bce8-66b1bd366d12'

const modalContent = [
    {
        modalTitle: 'hello!',
        modalDescription: 'In an upcoming App update, we will be sharing your levels and achievements here! Stay Tuned!!',
        buttonLabel: 'Close',
    },
]


export default function NavBar(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [User, setUser] = useState(Object)
    const [UserPoints, setUserPoints] = useState(Object)
    const [UserCCandLoginPoints, setUserCCandLoginPoints] = useState(Object)
    const [showNewLevelAlert, setShowNewLevelAlert] = useState(false)
    const [userCurrentLevel, setUserCurrentLevel] = useState(0)
    const [userPreviousLevel, setUserPreviousLevel] = useState(0)
    const [activeUserThemePoints, setActiveUserThemePoints] = useState(Object)
    // @ts-ignore
    const showNewLevelModal = () => props.alertNewLevel()

    useEffect(() => {
        // @ts-ignore
        let activeSession = JSON.parse(localStorage.getItem('session'))
        let access = ''
        if (activeSession) {
            access = activeSession['loginStatus']
        }

        // fetch latest user permissions , set the state

        if (access != 'Granted') {
            if (typeof window !== 'undefined') {
                window.location.href = window.location.origin + '/eh'
            }
        }
        let userInitPoints = JSON.parse(localStorage.getItem('points'))
        if (userInitPoints) {
            // setUserPreviousLevel(Math.floor(parseInt(userInitPoints.meta[0].CC_Points) / 121))
            ///
            let counter = -1
            let catKey = ''
            let CategoryKeys = Object.keys(userInitPoints.meta[0].Categories_Points[0])
            CategoryKeys.forEach(element => {
                if (userInitPoints.meta[0].Categories_Points[0][element] > 0) {
                    counter++
                    catKey = CategoryKeys[counter]
                }
            })
            let level = counter.toString()
            //done
            // level = counter + 2
            ///
            // setUserCurrentLevel(Math.floor(parseInt(userPoints.CC_Points) / 121))

            if (localStorage.getItem('level:cc:v1')) {
                let previousLevel = localStorage.getItem('level:cc:v1')
                if (previousLevel < parseInt(level)) {
                    showNewLevelModal()
                    if (level == -1) {
                        level = 0
                    }
                    localStorage.setItem('level:cc:v1', level)
                }
            }
            if (!localStorage.getItem('level:cc:v1')) {
                if (level == -1) {
                    level = 0
                }
                localStorage.setItem('level:cc:v1', level)
            }

        }
        setUser(activeSession)

        window.addEventListener('storage', () => {
            // When local storage changes, dump the list to
            // the console.
            let activeSession = JSON.parse(localStorage.getItem('session'))
            setUser(activeSession)
        })

        const handleOffline = () => {
            // Clear the timer when the network is offline
            clearInterval(timer)
        }

        // Listen for the 'offline' event
        window.addEventListener('offline', handleOffline)

        const realtimePoints = setInterval(async () => {
            // Function to be executed every 2 seconds
            let userPoints = await getUserPoints(activeSession.uuid)
            setUserPoints(userPoints)

            // let userThemeTotalPoints = await getUserActivityThemePoints(activeSession.uuid)
            // setActiveUserThemePoints({ userThemeTotalPoints })

            setUserCCandLoginPoints(parseInt(userPoints.Login_Points) + parseInt(userPoints.CC_Points))


            // ///
            let counter = -1
            let catKey = ''
            let CategoryKeys = Object.keys(userPoints.Categories_Points[0])
            CategoryKeys.forEach(element => {

                if (userPoints.Categories_Points[0][element] > 0) {
                    counter++

                    catKey = CategoryKeys[counter]
                }
            })

            let level = counter

            let lastCatValue = userPoints.Categories_Points[0][catKey]
            //done
            // level = counter + 2
            ///
            // setUserCurrentLevel(Math.floor(parseInt(userPoints.CC_Points) / 121))

            if (localStorage.getItem('level:cc:v1')) {
                let previousLevel = localStorage.getItem('level:cc:v1')
                if (lastCatValue > 120) {
                    if (previousLevel <= level) {

                        showNewLevelModal()
                        if (level == -1) {
                            level = 0
                        }
                        localStorage.setItem('level:cc:v1', level + 1)
                    }

                }
            }

            // shows new level modal

        }, 6600)

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(realtimePoints)
            window.removeEventListener('offline', handleOffline)
        }

    }, [])

    return (
        <header className='bg-[transparent]' style={{ 'marginBottom': '-99px' }}>
            <nav className='mx-auto flex max-w-7xl items-center justify-between mt-5' style={{ 'maxWidth': '1180px' }}>
                <div className='flex lg:flex-1'>
                    <Link href='/profile'>
                        <button>
                            <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md '>
                                {User.displayInitials && User.APISessionToken === '1b9aead01157106b89ed04cc5338968371f00a5d' ? (<span className='text-xl font-medium leading-none p_color'><img src={icon.src} /></span>) : <></>}
                                {User.displayInitials && User.APISessionToken != '1b9aead01157106b89ed04cc5338968371f00a5d' ? (<span className='text-xl font-medium leading-none p_color'>{User.displayInitials}</span>) : <></>}
                            </span>
                        </button
                        ></Link>
                </div>
                <div className='flex justify-center lg:flex lg:flex-1 lg:justify-center'>
                    <Link href={'/activities'}><button className='logo_nav'>   <img className='h-20 w-auto' src={icon.src} alt='ambience.LIFE logo' /></button></Link>
                </div>

                <div className='lg:flex lg:flex-1 lg:justify-end'>
                    {/* <button className='dynamic_points_pill'> <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md'>
                        {UserCCandLoginPoints ? (<span className='text-xl font-medium leading-none p_color dynamic_points'>{UserCCandLoginPoints > 0 ? UserCCandLoginPoints : <></>}</span>) : <></>}
                        {/* {   {updateUserPoints(5)}} 
                    </span></button> */}
                    <div className='dynamic_points_pill'> <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md'>
                        <ModalContainer visible={false} content={modalContent} buttonTitle={'Achievements'} buttonIcon={TrophyIcon} />
                    </span></div>
                </div>
            </nav>
        </header>
    )
}