/* a-growers layout.tsx */
'use client'
import React, { useState, useEffect, useContext } from 'react'

// @@ Import external structure functions @@
import { DotsLoadingAnimation } from '../../../components/ui/loading-animation'

// @@ Import App Version Function @@
import VersionContext from '../../../utils/(contexts)/VersionContext'

// import NavBar from '../../(a-growers)/components/NavBarGrowers'
// import Footer from '@/app/(a-growers)/components/FooterGrowers'

interface LayoutProps {
    children: React.ReactNode
    user: any
}

interface UserType {
    firstName: string
}

export default function GrowersLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState<UserType | null>(null)
    const [userSessionToken, setuserSessionToken] = useState<{ ccdd_Token: string } | null>(null)
    const { version } = useContext(VersionContext)

    useEffect(() => {

        // Check if version has changed
        const browser_version = localStorage.getItem('version')
        if (version !== browser_version) {
            localStorage.removeItem('session')
            localStorage.removeItem('points')
            localStorage.setItem('version', version)

            if (typeof window !== 'undefined') {
                window.location.href = window.location.origin + '/logout-versioncontrol'
            }
        }


        // check if user is logged in
        const activeSession = JSON.parse(localStorage.getItem('session') || '{}')

        setUser(activeSession)
        setuserSessionToken(activeSession)

        if (activeSession?.loginStatus !== 'Granted' && typeof window !== 'undefined') {
            window.location.href = window.location.origin + '/logout-undefined'
        }

        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1100)

        return () => clearTimeout(timeout)

    }, [])

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <DotsLoadingAnimation />
        </div>
    }

    return (
        <main className='text-[Plus Jakarta Sans] h-7/8 Woohoo'>
            {/* <NavBar /> */}
            <div className='al_home py-8 text-[Plus Jakarta Sans] pb-[121px]'>
                {children}
            </div>
            {/* <Footer /> */}
        </main>
    )
}

