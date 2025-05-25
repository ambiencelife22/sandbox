/* NavBarActivities.js */
'use client'
import { useState, useEffect } from 'react'

// @@ Import structure functions @@
import Link from 'next/link'

// @@ Import data hooks @@
import { Dialog } from '@headlessui/react'

// @@ Import points hooks @@
import { updateUserPoints, getUserPoints } from '../../(libs)/helpers'

// @@ Import icons @@
import icon from '../../ambience-03-White.png'

// @@ Import external functions @@
import ModalContainer from '../../components/ModalContainer'

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
    const [UserActivityPoints, setUserActivityPoints] = useState(Object)
    const [showNewLevelAlert, setShowNewLevelAlert] = useState(false)
    const [userCurrentLevel, setUserCurrentLevel] = useState(0)
    const [userPreviousLevel, setUserPreviousLevel] = useState(0)
    const [userDisplayLevel, setUserDisplayLevel] = useState('')

    // @ts-ignore
    // const showNewLevelModal = () => props.alertNewLevel()

    useEffect(() => {

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

            if (localStorage.getItem('level:activities:v1')) {
                let previousLevel = localStorage.getItem('level:activities:v1')
                if (previousLevel < parseInt(level)) {
                    // showNewLevelModal()
                    if (level == -1) {
                        level = 0
                    }
                    localStorage.setItem('level:activities:v1', level)
                }
            }
            if (!localStorage.getItem('level:activities:v1')) {
                if (level == -1) {
                    level = 0
                }
                localStorage.setItem('level:activities:v1', level)
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

            setUserActivityPoints(parseInt(userPoints.Login_Points) + parseInt(userPoints.Activity_Points))


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

            if (localStorage.getItem('level:activities:v1')) {
                let previousLevel = localStorage.getItem('level:activities:v1')
                if (lastCatValue > 120) {
                    if (previousLevel <= level) {

                        // showNewLevelModal()
                        if (level == -1) {
                            level = 0
                        }
                        localStorage.setItem('level:activities:v1', level + 1)
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
            <nav className='activities_navBar mx-auto flex max-w-7xl items-center justify-between pt-5' style={{ 'maxWidth': '1180px' }}>
                <div className='flex flex-1'>
                    <Link href='/profile'>
                        <button>
                            <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md '>
                                {User.displayInitials && User.APISessionToken === '1b9aead01157106b89ed04cc5338968371f00a5d' ? (<span className='text-xl font-medium leading-none p_color'><img src={icon.src} /></span>) : <></>}
                                {User.displayInitials && User.APISessionToken != '1b9aead01157106b89ed04cc5338968371f00a5d' ? (<span className='text-xl font-medium leading-none p_color'>{User.displayInitials}</span>) : <></>}
                            </span>
                        </button>
                    </Link>
                </div>

                {/* Centered Logo */}
                <div className='flex justify-center flex-1 justify-center'>
                    <Link href={'/activities'}><button className='logo_nav'>   <img className='h-20 w-auto' src={icon.src} alt='' /></button></Link>
                </div>

                {/* Right content */}
                <div className='flex flex-1 justify-end gap-2'>
                    <button className='dynamic_points_pill'>
                        <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md'>
                            {UserActivityPoints ?
                                (<span className='text-xl font-medium leading-none p_color dynamic_points'>
                                    {userDisplayLevel !== '' ? userDisplayLevel : <></>}
                                </span>)
                                : <></>
                            }
                        </span>
                    </button>
                    <div className='dynamic_points_pill'>
                        <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md'>
                            <ModalContainer visible={false} content={modalContent} buttonTitle={'Achievements'} buttonIcon={TrophyIcon} />
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    )
}